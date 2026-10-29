#!/usr/bin/env swift
/**
 * Transcodifica un video para web: H.264 con bitrate controlado y recorte opcional.
 *
 * Uso: swift scripts/compress-video.swift <entrada> <salida> [segundos] [kbps]
 *   segundos: 0 = clip completo
 *   kbps: bitrate de video en kilobits (por defecto 1400)
 */
import Foundation
import AVFoundation
import CoreMedia
import CoreImage

let args = CommandLine.arguments
guard args.count >= 3 else {
    print("Uso: swift scripts/compress-video.swift <entrada> <salida> [segundos] [kbps]")
    exit(1)
}
let inputURL = URL(fileURLWithPath: args[1])
let outputURL = URL(fileURLWithPath: args[2])
let clipSeconds = args.count > 3 ? (Double(args[3]) ?? 0) : 0
let kbps = args.count > 4 ? (Double(args[4]) ?? 1400) : 1400

let asset = AVURLAsset(url: inputURL)
guard let videoTrack = try await asset.loadTracks(withMediaType: .video).first else {
    print("❌ El archivo no tiene pista de video")
    exit(1)
}
let audioTrack = try await asset.loadTracks(withMediaType: .audio).first

let naturalSize = try await videoTrack.load(.naturalSize)
let transform = try await videoTrack.load(.preferredTransform)
let duration = try await asset.load(.duration)

let rotated = abs(transform.a) < 0.001
let sourceWidth = rotated ? naturalSize.height : naturalSize.width
let sourceHeight = rotated ? naturalSize.width : naturalSize.height
print("Origen: \(Int(sourceWidth))×\(Int(sourceHeight)) · \(String(format: "%.1f", duration.seconds)) s")

// Escala a un máximo de 1080 de alto (o 720) manteniendo proporción.
let maxHeight: Double = 1280
var width = sourceWidth
var height = sourceHeight
if height > maxHeight {
    let ratio = maxHeight / height
    width = sourceWidth * ratio
    height = maxHeight
}
let outWidth = Int(width.rounded() / 2) * 2
let outHeight = Int(height.rounded() / 2) * 2
print("Salida: \(outWidth)×\(outHeight) @ \(Int(kbps)) kbps")

try? FileManager.default.removeItem(at: outputURL)
let writer = try AVAssetWriter(outputURL: outputURL, fileType: .mp4)
writer.shouldOptimizeForNetworkUse = true

let videoSettings: [String: Any] = [
    AVVideoCodecKey: AVVideoCodecType.h264,
    AVVideoWidthKey: outWidth,
    AVVideoHeightKey: outHeight,
    AVVideoCompressionPropertiesKey: [
        AVVideoAverageBitRateKey: Int(kbps * 1000),
        AVVideoMaxKeyFrameIntervalKey: 30,
        AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
        AVVideoAllowFrameReorderingKey: true,
    ],
]

let videoInput = AVAssetWriterInput(mediaType: .video, outputSettings: videoSettings)
videoInput.expectsMediaDataInRealTime = false
let videoAdaptor = AVAssetWriterInputPixelBufferAdaptor(
    assetWriterInput: videoInput,
    sourcePixelBufferAttributes: [
        kCVPixelBufferPixelFormatTypeKey as String: Int(kCVPixelFormatType_32BGRA),
        kCVPixelBufferWidthKey as String: outWidth,
        kCVPixelBufferHeightKey as String: outHeight,
    ]
)
writer.add(videoInput)

var audioInput: AVAssetWriterInput?
if let audioTrack {
    let settings: [String: Any] = [
        AVFormatIDKey: kAudioFormatMPEG4AAC,
        AVNumberOfChannelsKey: 2,
        AVSampleRateKey: 44100.0,
        AVEncoderBitRateKey: 96_000,
    ]
    let input = AVAssetWriterInput(mediaType: .audio, outputSettings: settings)
    input.expectsMediaDataInRealTime = false
    writer.add(input)
    audioInput = input
}

guard writer.startWriting() else {
    print("❌ No se pudo iniciar la escritura: \(writer.error?.localizedDescription ?? "")")
    exit(1)
}
writer.startSession(atSourceTime: .zero)

let reader = try AVAssetReader(asset: asset)
let outputSettings: [String: Any] = [
    kCVPixelBufferPixelFormatTypeKey as String: Int(kCVPixelFormatType_32BGRA),
    kCVPixelBufferWidthKey as String: outWidth,
    kCVPixelBufferHeightKey as String: outHeight,
]
let videoOutput = AVAssetReaderTrackOutput(track: videoTrack, outputSettings: outputSettings)
videoOutput.alwaysCopiesSampleData = false
reader.add(videoOutput)
if let audioTrack {
    let audioOutput = AVAssetReaderTrackOutput(track: audioTrack, outputSettings: nil)
    reader.add(audioOutput)
}
guard reader.startReading() else {
    print("❌ No se pudo leer el archivo")
    exit(1)
}

let limit = clipSeconds > 0 ? CMTime(seconds: clipSeconds, preferredTimescale: 600) : duration
var lastPTS = CMTime.zero
let ciContext = CIContext(options: nil)

// Atajo: si la orientación ya es correcta y no hay que escalar, se copia el frame tal cual.
let isIdentity = abs(transform.a - 1) < 0.001 && abs(transform.d - 1) < 0.001
let sameSize = Int(sourceWidth) == outWidth && Int(sourceHeight) == outHeight
let passThrough = isIdentity && sameSize

while let sample = videoOutput.copyNextSampleBuffer() {
    if let buffer = CMSampleBufferGetImageBuffer(sample) {
        let pts = CMSampleBufferGetPresentationTimeStamp(sample)
        if pts > limit { break }
        while !videoInput.isReadyForMoreMediaData { Thread.sleep(forTimeInterval: 0.005) }
        let scaled = scale(buffer, to: outWidth, to: outHeight, transform: transform, direct: passThrough)
        if !videoAdaptor.append(scaled, withPresentationTime: pts) {
            print("❌ Error al escribir frame: \(writer.error?.localizedDescription ?? "")")
            exit(1)
        }
        lastPTS = pts
    }
}
videoInput.markAsFinished()

if let audioTrack, let audioInput {
    if let audioOutput = reader.outputs.compactMap({ $0 as? AVAssetReaderTrackOutput }).last {
        while let sample = audioOutput.copyNextSampleBuffer() {
            let pts = CMSampleBufferGetPresentationTimeStamp(sample)
            if pts > limit { break }
            while !audioInput.isReadyForMoreMediaData { Thread.sleep(forTimeInterval: 0.005) }
            audioInput.append(sample)
        }
    }
    audioInput.markAsFinished()
}

let done = DispatchSemaphore(value: 0)
writer.finishWriting { done.signal() }
done.wait()

if writer.status == .completed {
    let size = (try? FileManager.default.attributesOfItem(atPath: outputURL.path)[.size] as? Int) ?? 0
    let original = (try? FileManager.default.attributesOfItem(atPath: inputURL.path)[.size] as? Int) ?? 0
    print("✅ \(outputURL.lastPathComponent): \(String(format: "%.1f", Double(size) / 1_048_576)) MB (original \(String(format: "%.1f", Double(original) / 1_048_576)) MB)")
} else {
    print("❌ Error al escribir: \(writer.error?.localizedDescription ?? "desconocido")")
    exit(1)
}

/// Escala y rota el frame a la orientación correcta con CoreImage.
/// Si no hace falta transformar ni escalar, devuelve el buffer original.
func scale(
    _ buffer: CVPixelBuffer,
    to width: Int,
    to height: Int,
    transform: CGAffineTransform,
    direct: Bool
) -> CVPixelBuffer {
    if direct { return buffer }
    var out: CVPixelBuffer?
    CVPixelBufferCreate(
        kCFAllocatorDefault, width, height, kCVPixelFormatType_32BGRA,
        [kCVPixelBufferCGImageCompatibilityKey: true, kCVPixelBufferCGBitmapContextCompatibilityKey: true] as CFDictionary,
        &out
    )
    guard let out else { return buffer }
    let ci = CIImage(cvPixelBuffer: buffer)
    let oriented = ci.transformed(by: transform)
    let sx = CGFloat(width) / oriented.extent.width
    let sy = CGFloat(height) / oriented.extent.height
    let scaled = oriented.transformed(by: CGAffineTransform(scaleX: sx, y: sy))
    let cropped = scaled.cropped(to: CGRect(x: 0, y: 0, width: width, height: height))
    ciContext.render(
        cropped,
        to: out,
        bounds: CGRect(x: 0, y: 0, width: width, height: height),
        colorSpace: CGColorSpaceCreateDeviceRGB()
    )
    return out
}

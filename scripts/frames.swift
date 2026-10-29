#!/usr/bin/env swift
/**
 * Extrae fotogramas de un video para usarlos como póster.
 *
 * Uso: swift scripts/frames.swift <video> <carpeta> [cantidad]
 */
import Foundation
import AVFoundation
import AppKit

let args = CommandLine.arguments
guard args.count >= 3 else {
    print("Uso: swift scripts/frames.swift <video> <carpeta> [cantidad]")
    exit(1)
}
let videoURL = URL(fileURLWithPath: args[1])
let folder = URL(fileURLWithPath: args[2])
let count = args.count > 3 ? Int(args[3]) ?? 8 : 8

try? FileManager.default.createDirectory(at: folder, withIntermediateDirectories: true)

let asset = AVURLAsset(url: videoURL)
let generator = AVAssetImageGenerator(asset: asset)
generator.appliesPreferredTrackTransform = true
generator.requestedTimeToleranceBefore = CMTime(seconds: 0.2, preferredTimescale: 600)
generator.requestedTimeToleranceAfter = CMTime(seconds: 0.2, preferredTimescale: 600)

let duration = CMTimeGetSeconds(asset.duration)
print("Duración: \(String(format: "%.1f", duration)) s")

for i in 0..<count {
    let t = duration * (Double(i) + 0.5) / Double(count)
    let time = CMTime(seconds: t, preferredTimescale: 600)
    do {
        let cg = try generator.copyCGImage(at: time, actualTime: nil)
        let rep = NSBitmapImageRep(cgImage: cg)
        if let data = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.9]) {
            let path = folder.appendingPathComponent("frame-\(String(format: "%02d", i)).jpg")
            try data.write(to: path)
            print("· \(path.lastPathComponent) @ \(String(format: "%.1f", t))s")
        }
    } catch {
        print("⚠️  no se pudo extraer el frame \(i)")
    }
}

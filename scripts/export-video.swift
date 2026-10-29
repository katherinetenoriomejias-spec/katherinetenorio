#!/usr/bin/env swift
/**
 * Exporta un video a H.264 para web, sin pasar frame por frame.
 *
 * Uso: swift scripts/export-video.swift <entrada> <salida>
 */
import Foundation
import AVFoundation

let args = CommandLine.arguments
guard args.count >= 3 else {
    print("Uso: swift scripts/export-video.swift <entrada> <salida>")
    exit(1)
}
let input = URL(fileURLWithPath: args[1])
let output = URL(fileURLWithPath: args[2])

let asset = AVURLAsset(url: input)
let presets = [
    AVAssetExportPresetMediumQuality,
    AVAssetExportPreset1280x720,
    AVAssetExportPresetHighestQuality,
]

var chosen: String?
for preset in presets {
    let ok = await AVAssetExportSession.compatibility(
        ofExportPreset: preset,
        with: asset,
        outputFileType: AVFileType.mp4
    )
    if ok {
        chosen = preset
        break
    }
}
guard let preset = chosen else {
    print("❌ No se encontró un preset compatible")
    exit(1)
}
print("Preset: \(preset)")

try? FileManager.default.removeItem(at: output)
guard let session = AVAssetExportSession(asset: asset, presetName: preset) else {
    print("❌ No se pudo crear la sesión")
    exit(1)
}
session.outputURL = output
session.outputFileType = .mp4
session.shouldOptimizeForNetworkUse = true

let semaphore = DispatchSemaphore(value: 0)
session.exportAsynchronously { semaphore.signal() }
semaphore.wait()

switch session.status {
case .completed:
    let size = (try? FileManager.default.attributesOfItem(atPath: output.path)[.size] as? Int) ?? 0
    let original = (try? FileManager.default.attributesOfItem(atPath: input.path)[.size] as? Int) ?? 0
    print("✅ \(output.lastPathComponent): \(String(format: "%.1f", Double(size) / 1_048_576)) MB (original \(String(format: "%.1f", Double(original) / 1_048_576)) MB)")
case .failed:
    print("❌ Error: \(session.error?.localizedDescription ?? "desconocido")")
    exit(1)
default:
    print("❌ Exportación no completada")
    exit(1)
}

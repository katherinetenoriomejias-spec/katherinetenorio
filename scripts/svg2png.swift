#!/usr/bin/env swift
/**
 * Convierte un SVG a PNG 1024×1024.
 *
 * Uso: swift scripts/svg2png.swift <entrada.svg> <salida.png>
 */
import Foundation
import AppKit

let args = CommandLine.arguments
guard args.count >= 3 else {
    print("Uso: swift scripts/svg2png.swift <entrada.svg> <salida.png>")
    exit(1)
}
let input = args[1]
let output = args[2]

guard let image = NSImage(contentsOfFile: input) else {
    print("❌ No se pudo leer el SVG")
    exit(1)
}

let targetSize = NSSize(width: 1024, height: 1024)
let rep = NSBitmapImageRep(
    bitmapDataPlanes: nil,
    pixelsWide: 1024,
    pixelsHigh: 1024,
    bitsPerSample: 8,
    samplesPerPixel: 4,
    hasAlpha: true,
    isPlanar: false,
    colorSpaceName: .deviceRGB,
    bytesPerRow: 0,
    bitsPerPixel: 0
)!
rep.size = targetSize

NSGraphicsContext.saveGraphicsState()
let ctx = NSGraphicsContext(bitmapImageRep: rep)
NSGraphicsContext.current = ctx
ctx?.imageInterpolation = .high
image.draw(
    in: NSRect(origin: .zero, size: targetSize),
    from: NSRect(origin: .zero, size: image.size),
    operation: .copy,
    fraction: 1.0
)
NSGraphicsContext.restoreGraphicsState()

guard let data = rep.representation(using: .png, properties: [:]) else {
    print("❌ No se pudo exportar PNG")
    exit(1)
}
try data.write(to: URL(fileURLWithPath: output))
print("✅ PNG 1024×1024: \(output)")

#!/usr/bin/env swift
/**
 * Collage horizontal de 3 fotos sin perder calidad.
 *
 * Uso: swift scripts/collage.swift <salida> <foto1> <foto2> <foto3>
 *
 * - Cada panel se recorta a la proporción del panel (sin reescalar hacia abajo).
 * - El lienzo se arma a la altura nativa de las fotos: no hay pérdida de detalle.
 * - Separación fina entre paneles y fondo del color de la web.
 */
import Foundation
import CoreImage
import CoreImage.CIFilterBuiltins
import AppKit

let args = CommandLine.arguments
guard args.count >= 5 else {
    print("Uso: swift scripts/collage.swift <salida> <foto1> <foto2> <foto3>")
    exit(1)
}
let outputPath = args[1]
let paths = Array(args[2...])

let context = CIContext(options: [.useSoftwareRenderer: false])
let background = CIColor(red: 0.992, green: 0.984, blue: 0.972)

/// Recorta al centro en la proporción pedida y devuelve la imagen lista.
func fitPanel(_ path: String, aspect: CGFloat) -> CIImage? {
    guard let image = NSImage(contentsOfFile: path),
          let tiff = image.tiffRepresentation,
          let rep = NSBitmapImageRep(data: tiff),
          let cg = rep.cgImage else { return nil }
    let ci = CIImage(cgImage: cg)
    let extent = ci.extent
    let currentAspect = extent.width / extent.height

    var cropped = ci
    if currentAspect > aspect {
        // Más ancha: recorta por los lados.
        let newWidth = extent.height * aspect
        let x = extent.minX + (extent.width - newWidth) / 2
        cropped = ci.cropped(to: CGRect(x: x, y: extent.minY, width: newWidth, height: extent.height))
    } else if currentAspect < aspect {
        // Más alta: recorta arriba y abajo (prioriza la parte superior, donde está la cara).
        let newHeight = extent.width / aspect
        let y = extent.minY + (extent.height - newHeight) * 0.35
        cropped = ci.cropped(to: CGRect(x: extent.minX, y: y, width: extent.width, height: newHeight))
    }
    return cropped
}

/// Realce suave de calidad por foto.
func enhance(_ image: CIImage) -> CIImage {
    var current = image
    let controls = CIFilter.colorControls()
    controls.inputImage = current
    controls.saturation = 1.06
    controls.brightness = 0.015
    controls.contrast = 1.03
    if let out = controls.outputImage { current = out }

    let noise = CIFilter.noiseReduction()
    noise.inputImage = current
    noise.noiseLevel = 0.012
    noise.sharpness = 0.35
    if let out = noise.outputImage { current = out }

    let sharpen = CIFilter.sharpenLuminance()
    sharpen.inputImage = current
    sharpen.sharpness = 0.45
    if let out = sharpen.outputImage { current = out }
    return current
}

let aspect: CGFloat = 0.78          // panel vertical suave (aprox. 4:5)
let gap: CGFloat = 10

var panels: [CIImage] = []
for path in paths {
    if let panel = fitPanel(path, aspect: aspect) {
        panels.append(enhance(panel))
    }
}
guard !panels.isEmpty else {
    print("❌ No se pudieron leer las fotos")
    exit(1)
}

let panelHeight = panels.map { $0.extent.height }.max() ?? 2000
let panelWidth = panelHeight * aspect
let totalWidth = panelWidth * CGFloat(panels.count) + gap * CGFloat(panels.count - 1)

var canvas = CIImage(color: background).cropped(to: CGRect(x: 0, y: 0, width: totalWidth, height: panelHeight))

for (index, panel) in panels.enumerated() {
    let scaled = panel.transformed(by: CGAffineTransform(scaleX: panelWidth / panel.extent.width,
                                                          y: panelHeight / panel.extent.height))
    let x = CGFloat(index) * (panelWidth + gap)
    let placed = scaled.transformed(by: CGAffineTransform(translationX: x, y: 0))
    canvas = placed.composited(over: canvas)
}

guard let outCG = context.createCGImage(canvas, from: canvas.extent) else {
    print("❌ No se pudo renderizar el collage")
    exit(1)
}
let rep = NSBitmapImageRep(cgImage: outCG)
guard let data = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.9]) else {
    print("❌ No se pudo exportar")
    exit(1)
}
try data.write(to: URL(fileURLWithPath: outputPath))
print("✅ Collage: \(outputPath) — \(Int(totalWidth))×\(Int(panelHeight)) px, \(panels.count) fotos")

#!/usr/bin/env swift
/**
 * Mejora de calidad de una foto.
 *
 * Uso: swift scripts/enhance.swift <entrada> <salida>
 *
 * CoreImage: saturación/contraste suaves, reducción de ruido, nitidez y
 * temperatura ligeramente cálida. Sin pérdida de resolución.
 */
import Foundation
import CoreImage
import CoreImage.CIFilterBuiltins
import AppKit

let args = CommandLine.arguments
guard args.count >= 3 else {
    print("Uso: swift scripts/enhance.swift <entrada> <salida>")
    exit(1)
}
let inputPath = args[1]
let outputPath = args[2]

guard let image = NSImage(contentsOfFile: inputPath),
      let tiff = image.tiffRepresentation,
      let rep = NSBitmapImageRep(data: tiff),
      let cg = rep.cgImage else {
    print("❌ No se pudo leer la imagen: \(inputPath)")
    exit(1)
}

let context = CIContext(options: [.useSoftwareRenderer: false])
var current = CIImage(cgImage: cg)

let controls = CIFilter.colorControls()
controls.inputImage = current
controls.saturation = 1.07
controls.brightness = 0.015
controls.contrast = 1.04
if let out = controls.outputImage { current = out }

let exposure = CIFilter.exposureAdjust()
exposure.inputImage = current
exposure.ev = 0.12
if let out = exposure.outputImage { current = out }

let noise = CIFilter.noiseReduction()
noise.inputImage = current
noise.noiseLevel = 0.012
noise.sharpness = 0.35
if let out = noise.outputImage { current = out }

let sharpen = CIFilter.sharpenLuminance()
sharpen.inputImage = current
sharpen.sharpness = 0.45
if let out = sharpen.outputImage { current = out }

let temperature = CIFilter.temperatureAndTint()
temperature.inputImage = current
temperature.neutral = CIVector(x: 6500, y: 0)
temperature.targetNeutral = CIVector(x: 6700, y: 0)
if let out = temperature.outputImage { current = out }

guard let outCG = context.createCGImage(current, from: current.extent) else {
    print("❌ No se pudo renderizar")
    exit(1)
}
let outRep = NSBitmapImageRep(cgImage: outCG)
guard let data = outRep.representation(using: .jpeg, properties: [.compressionFactor: 0.92]) else {
    print("❌ No se pudo exportar JPEG")
    exit(1)
}
try data.write(to: URL(fileURLWithPath: outputPath))
print("✅ Mejorado: \(outputPath)")

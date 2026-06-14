"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Image as ImageIcon,
  Upload,
  Download,
  RefreshCw,
  ChevronRight,
  Info,
  AlertCircle,
  Maximize2,
  Minimize2,
  FileImage,
  Settings2,
  CheckCircle2,
  Wrench,
  HelpCircle,
  Zap,
} from "lucide-react";
import { tools } from "@/data/tools";

interface ImageState {
  file: File;
  preview: string;
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
  aspectRatio: number;
  size: number;
}

const EXAM_PRESETS = [
  { label: "SSC Photo", width: 413, height: 531, desc: "3.5x4.5 cm" },
  { label: "SSC Sign", width: 472, height: 236, desc: "4.0x2.0 cm" },
  { label: "UPSC Photo", width: 350, height: 350, desc: "350x350 px" },
  { label: "IBPS Photo", width: 200, height: 230, desc: "200x230 px" },
  { label: "IBPS Sign", width: 140, height: 60, desc: "140x60 px" },
  { label: "Square", width: 500, height: 500, desc: "1:1 Ratio" },
];

export function ImageResizer() {
  const [image, setImage] = useState<ImageState | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [quality, setQuality] = useState(0.8);
  const [targetWidth, setTargetWidth] = useState(0);
  const [targetHeight, setTargetHeight] = useState(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [resizedSize, setResizedSize] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      loadImage(file);
    }
  };

  const loadImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const state: ImageState = {
          file,
          preview: e.target?.result as string,
          width: img.width,
          height: img.height,
          originalWidth: img.width,
          originalHeight: img.height,
          aspectRatio: img.width / img.height,
          size: file.size,
        };
        setImage(state);
        setTargetWidth(img.width);
        setTargetHeight(img.height);
        setResizedImage(null);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (val: number) => {
    setTargetWidth(val);
    if (maintainAspectRatio && image) {
      setTargetHeight(Math.round(val / image.aspectRatio));
    }
  };

  const handleHeightChange = (val: number) => {
    setTargetHeight(val);
    if (maintainAspectRatio && image) {
      setTargetWidth(Math.round(val * image.aspectRatio));
    }
  };

  const applyPreset = (w: number, h: number) => {
    setMaintainAspectRatio(false);
    setTargetWidth(w);
    setTargetHeight(h);
  };

  const resizeImage = async () => {
    if (!image) return;
    setIsResizing(true);

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      const dataUrl = canvas.toDataURL(image.file.type, quality);
      setResizedImage(dataUrl);

      // Estimate file size from base64
      const head = `data:${image.file.type};base64,`;
      const size = Math.round(((dataUrl.length - head.length) * 3) / 4);
      setResizedSize(size);
      setIsResizing(false);
    };
    img.src = image.preview;
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const downloadImage = () => {
    if (!resizedImage) return;
    const link = document.createElement("a");
    link.href = resizedImage;
    link.download = `resized-${image?.file.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-off-white pt-20 pb-16">
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-wider mb-6">
                <ImageIcon className="w-3.5 h-3.5" />
                Professional Utility Tool
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-navy mb-6 leading-tight">
                Online <span className="text-brand">Image Resizer</span>
              </h1>
              <p className="text-body-text text-lg md:text-xl leading-relaxed mb-8">
                Resize, compress and convert your images to any dimension or
                file size. Perfect for government job applications, exam forms,
                and social media.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-status-green" />
                  Fast & Secure
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-status-green" />
                  Client-side processing
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-status-green" />
                  Free Forever
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="w-72 h-72 bg-brand/5 rounded-3xl rotate-6 absolute -inset-4" />
              <div className="w-72 h-72 bg-white border-2 border-slate-100 rounded-3xl shadow-xl relative flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 bg-brand rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-brand/20">
                  <Maximize2 className="w-10 h-10 text-white" />
                </div>
                <p className="text-navy font-bold text-xl mb-2">
                  Instant Resizing
                </p>
                <p className="text-slate-500 text-sm">
                  Convert images to exact KB/MB requirements
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 -mt-12 md:-mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Workspace Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Resizer Card */}
            <div className="bg-white rounded-3xl shadow-card border border-slate-100 overflow-hidden">
              <div className="p-1 bg-slate-100" />
              <div className="p-8">
                {!image ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 cursor-pointer hover:border-brand/50 hover:bg-brand/5 transition-all group"
                  >
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <Upload className="w-8 h-8 text-slate-300 group-hover:text-brand" />
                    </div>
                    <h3 className="text-navy font-bold text-xl mb-2">
                      Upload Image to Resize
                    </h3>
                    <p className="text-slate-500 text-sm max-w-xs mx-auto">
                      Select a JPG, PNG or WebP file from your device
                    </p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center">
                          <FileImage className="w-6 h-6 text-brand" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-navy">
                            {image.file.name}
                          </h3>
                          <p className="text-xs text-slate-500">
                            {formatSize(image.size)} • {image.originalWidth}x
                            {image.originalHeight}px
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setImage(null)}
                        className="text-sm font-bold text-slate-400 hover:text-brand transition-colors"
                      >
                        Change Image
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      {/* Controls */}
                      <div className="space-y-8">
                        {/* Quick Presets */}
                        <div className="space-y-4">
                          <h4 className="text-sm font-bold text-navy uppercase tracking-widest flex items-center gap-2">
                            <Zap className="w-4 h-4 text-brand" />
                            Quick Exam Presets
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {EXAM_PRESETS.map((preset, i) => (
                              <button
                                key={i}
                                onClick={() =>
                                  applyPreset(preset.width, preset.height)
                                }
                                className="p-3 bg-slate-50 border-2 border-slate-100 hover:border-brand/30 hover:bg-brand/5 rounded-xl transition-all text-left group"
                              >
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5 group-hover:text-brand/70">
                                  {preset.label}
                                </div>
                                <div className="text-[11px] font-bold text-navy whitespace-nowrap">
                                  {preset.desc}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-sm font-bold text-navy uppercase tracking-widest flex items-center gap-2">
                            <Settings2 className="w-4 h-4 text-brand" />
                            Custom Dimensions
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-500">
                                Width (px)
                              </label>
                              <input
                                type="number"
                                value={targetWidth}
                                onChange={(e) =>
                                  handleWidthChange(
                                    parseInt(e.target.value) || 0,
                                  )
                                }
                                className="w-full h-12 border-2 border-slate-100 bg-slate-50/50 rounded-xl px-4 text-navy font-bold focus:outline-none focus:border-brand focus:bg-white transition-all"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-500">
                                Height (px)
                              </label>
                              <input
                                type="number"
                                value={targetHeight}
                                onChange={(e) =>
                                  handleHeightChange(
                                    parseInt(e.target.value) || 0,
                                  )
                                }
                                className="w-full h-12 border-2 border-slate-100 bg-slate-50/50 rounded-xl px-4 text-navy font-bold focus:outline-none focus:border-brand focus:bg-white transition-all"
                              />
                            </div>
                          </div>
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={maintainAspectRatio}
                              onChange={(e) =>
                                setMaintainAspectRatio(e.target.checked)
                              }
                              className="w-5 h-5 rounded-lg border-2 border-slate-200 text-brand focus:ring-brand accent-brand"
                            />
                            <span className="text-sm font-bold text-slate-600 group-hover:text-navy transition-colors">
                              Maintain Aspect Ratio
                            </span>
                          </label>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-sm font-bold text-navy uppercase tracking-widest flex items-center gap-2">
                            <Minimize2 className="w-4 h-4 text-brand" />
                            Quality & Compression
                          </h4>
                          <input
                            type="range"
                            min="0.1"
                            max="1"
                            step="0.05"
                            value={quality}
                            onChange={(e) =>
                              setQuality(parseFloat(e.target.value))
                            }
                            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand"
                          />
                          <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <span>Maximum Compression</span>
                            <span>
                              High Quality ({Math.round(quality * 100)}%)
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={resizeImage}
                          disabled={isResizing}
                          className="w-full py-4 bg-navy text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                          {isResizing ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <Settings2 className="w-4 h-4" />
                          )}
                          Resize Image Now
                        </button>
                      </div>

                      {/* Preview */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold text-navy uppercase tracking-widest">
                          Preview
                        </h4>
                        <div className="aspect-square bg-slate-50 rounded-3xl border-2 border-slate-100 overflow-hidden flex items-center justify-center p-4">
                          <img
                            src={resizedImage || image.preview}
                            alt="Preview"
                            className="max-w-full max-h-full object-contain shadow-lg rounded-lg"
                          />
                        </div>
                        {resizedImage && (
                          <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                            <div>
                              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                                Resized Size
                              </p>
                              <p className="font-bold text-emerald-900">
                                {formatSize(resizedSize)}
                              </p>
                            </div>
                            <button
                              onClick={downloadImage}
                              className="px-6 py-2.5 bg-emerald-500 text-white rounded-xl font-bold text-xs hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                            >
                              <Download className="w-3.5 h-3.5" />
                              Download
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Guide Section */}
            <div className="bg-white rounded-3xl shadow-card border border-slate-100 p-8">
              <h3 className="text-xl font-bold text-navy mb-8 flex items-center gap-2">
                <Info className="w-5 h-5 text-brand" />
                Common Exam Image Requirements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "SSC CGL / CHSL",
                    size: "20KB - 50KB",
                    dim: "3.5cm x 4.5cm",
                  },
                  {
                    title: "UPSC Civil Services",
                    size: "20KB - 300KB",
                    dim: "350 x 350 px",
                  },
                  {
                    title: "Banking (IBPS/SBI)",
                    size: "20KB - 50KB",
                    dim: "200 x 230 px",
                  },
                  {
                    title: "Railway RRB",
                    size: "20KB - 50KB",
                    dim: "35mm x 45mm",
                  },
                ].map((req, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-slate-50 border border-slate-100"
                  >
                    <h4 className="font-bold text-navy mb-2">{req.title}</h4>
                    <div className="flex flex-wrap gap-4 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <FileImage className="w-3.5 h-3.5" />
                        {req.size}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Maximize2 className="w-3.5 h-3.5" />
                        {req.dim}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-3xl shadow-card border border-slate-100 p-8">
              <h3 className="text-xl font-bold text-navy mb-8 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-brand" />
                Frequently Asked Questions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    q: "Is it safe to upload my photo here?",
                    a: "Yes! Your images are processed entirely in your browser. We don't upload or store your images on any server.",
                  },
                  {
                    q: "How to reduce image size to 50KB?",
                    a: "Upload your image, set the width/height as required, and use the 'Quality' slider to compress it until the preview size shows under 50KB.",
                  },
                  {
                    q: "What format should I use?",
                    a: "Most government exams require JPG/JPEG format. Our tool supports JPG, PNG and WebP.",
                  },
                  {
                    q: "Can I resize signatures too?",
                    a: "Yes, you can resize signatures, thumb impressions, and any other document images as per notification requirements.",
                  },
                ].map((faq, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand/20 transition-all"
                  >
                    <h4 className="font-bold text-navy mb-3 flex items-start gap-2 text-sm md:text-base">
                      <span className="w-6 h-6 bg-brand/10 text-brand rounded-lg flex items-center justify-center shrink-0 text-xs">
                        Q
                      </span>
                      {faq.q}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed pl-8">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-8">
            {/* Instructions Sidebar */}
            <div className="bg-navy rounded-3xl shadow-xl overflow-hidden text-white">
              <div className="p-8 pb-4">
                <h3 className="text-xl font-bold mb-2">How to Use</h3>
                <p className="text-slate-400 text-sm">
                  Follow these simple steps
                </p>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { step: "1", text: "Upload your image (Photo or Signature)" },
                  {
                    step: "2",
                    text: "Enter desired Width and Height in pixels",
                  },
                  {
                    step: "3",
                    text: "Adjust Quality slider to reduce file size (KB)",
                  },
                  { step: "4", text: "Click 'Resize' and then 'Download'" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-white/5 border border-white/5 flex gap-4"
                  >
                    <span className="w-6 h-6 rounded-full bg-brand flex items-center justify-center font-bold text-xs shrink-0">
                      {item.step}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-8 pt-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-brand shrink-0" />
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    <strong>Note:</strong> Always check the official
                    notification for exact dimension (cm/px) and file size (KB)
                    limits before applying.
                  </p>
                </div>
              </div>
            </div>

            {/* Other Tools Sidebar */}
            <div className="bg-white rounded-3xl shadow-card border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex items-center gap-3">
                <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy">
                    Other Utilities
                  </h3>
                  <p className="text-xs text-slate-500">
                    Related tools for students
                  </p>
                </div>
              </div>
              <div className="p-4 space-y-2">
                {tools
                  .filter((t) => t.slug !== "image-resizer")
                  .map((tool, i) => (
                    <Link
                      key={i}
                      href={tool.href}
                      className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all group"
                    >
                      <div className="w-10 h-10 bg-slate-50 group-hover:bg-white border border-transparent group-hover:border-slate-100 rounded-xl flex items-center justify-center transition-all">
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-navy group-hover:text-brand transition-colors truncate">
                          {tool.title}
                        </h4>
                        <p className="text-[10px] text-slate-500 truncate">
                          {tool.description}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

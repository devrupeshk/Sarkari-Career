"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  Home,
  ArrowLeft,
  Search,
  Briefcase,
  FileText,
  GraduationCap,
  Bell,
} from "lucide-react";

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      r: number;
      dx: number;
      dy: number;
      alpha: number;
    }[] = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    let raf: number;
    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(205, 8, 8, ${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      raf = requestAnimationFrame(draw);
    }
    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const quickLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/current-job", label: "Latest Jobs", icon: Briefcase },
    { href: "/admit-card", label: "Admit Card", icon: FileText },
    { href: "/education-levels", label: "Education Jobs", icon: GraduationCap },
    { href: "/results", label: "Results", icon: Bell },
  ];

  return (
    <div className="relative min-h-screen bg-navy overflow-hidden flex items-center justify-center">
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Background glows */}
      <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-brand/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[200px] pointer-events-none" />

      {/* Grid lines overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main content */}
      <div className="relative mt-16 z-10 text-center px-4 max-w-3xl mx-auto">
        {/* 404 Number */}
        <div className="relative mb-6 select-none">
          <span
            className="text-[160px] md:text-[220px] font-black leading-none tracking-tighter"
            style={{
              background:
                "linear-gradient(135deg, #CD0808 0%, #ff4444 40%, #CD0808 70%, #7f0000 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 60px rgba(205,8,8,0.4))",
            }}
          >
            404
          </span>
          {/* Glow ring behind 404 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 rounded-full bg-brand/10 blur-3xl" />
          </div>
        </div>

        {/* Glassmorphic card */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_8px_60px_rgba(0,0,0,0.4)] ring-1 ring-white/5 mb-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-brand/15 border border-brand/25 text-brand px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            Page Not Found
          </div>

          <h1 className="text-2xl md:text-4xl font-black text-white mb-3 tracking-tight">
            Oops! This page doesn&apos;t exist
          </h1>
          <p className="text-slate-400 text-base leading-relaxed max-w-md mx-auto mb-8">
            The page you&apos;re looking for may have been moved, deleted, or never
            existed. Let&apos;s get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 bg-brand hover:bg-brand-hover text-white font-bold px-7 py-3 rounded-full transition-all duration-300 shadow-lg shadow-brand/30 hover:shadow-xl hover:shadow-brand/40 hover:-translate-y-0.5 text-sm"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold px-7 py-3 rounded-full border border-white/15 hover:border-white/25 transition-all duration-300 text-sm backdrop-blur-md"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-white/8 pt-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
              Quick Navigation
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {quickLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/8 hover:bg-white/15 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white text-xs font-medium transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Search suggestion */}
        <p className="text-slate-600 text-sm flex items-center justify-center gap-1.5">
          <Search className="w-3.5 h-3.5" />
          Try searching from the{" "}
          <Link
            href="/"
            className="text-brand hover:text-red-400 underline underline-offset-2 font-medium transition-colors"
          >
            home page
          </Link>
        </p>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
import { RotateCw, Maximize2, Layers, Eye, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";
import { buildHdpe3DModel } from "./models/HdpeModel3D";
import { buildUpvc3DModel } from "./models/UpvcModel3D";
import { buildPpr3DModel } from "./models/PprModel3D";
import { buildConduit3DModel } from "./models/ConduitModel3D";

interface Stroman3DCanvasProps {
  sceneId: "hdpe" | "upvc" | "ppr" | "electric";
  accentColor: string;
}

/**
 * Kiểm tra xem trình duyệt có hỗ trợ WebGL hay không
 */
function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return !!(window.WebGLRenderingContext && gl);
  } catch (e) {
    return false;
  }
}

// Dữ liệu hình ảnh chất lượng cao làm chế độ dự phòng nếu GPU/WebGL bị tắt
const FALLBACK_PRODUCTS: Record<
  string,
  { name: string; image: string; tag: string; spec: string }
> = {
  hdpe: {
    name: "Ống Nhựa HDPE Ströman PE100",
    image: "https://stroman.vn/Upload/products/Ong-nhua-HDPE134248429157536896.png",
    tag: "VẬT LIỆU PE100 NGUYÊN SINH",
    spec: "PN6 – PN20 • Ø20 – Ø1200mm",
  },
  upvc: {
    name: "Ống Nhựa uPVC Chuẩn Đức",
    image: "https://stroman.vn/Upload/products/He-Met134248426535377688.png",
    tag: "ĐẦU NONG GIOĂNG CAO SU",
    spec: "ISO 1452 / TCVN 8491 • Không chì",
  },
  ppr: {
    name: "Ống Nhựa PP-R Chịu Nhiệt 95°C",
    image: "https://stroman.vn/Upload/products/Ong-nhua-PPR134248427957542709.png",
    tag: "CẤU TRÚC 3 LỚP NANO BẠC",
    spec: "Chịu nhiệt 95°C • Ren đồng CNC",
  },
  electric: {
    name: "Ống Luồn Dây Điện uPVC Chống Cháy",
    image: "https://stroman.vn/Upload/products/Ong-nhua-uPVC134248424738456593.png",
    tag: "CHỐNG CHÁY LAN • CHỊU NÉN 750N",
    spec: "BS EN 61386 • Cách điện âm tường",
  },
};

export function Stroman3DCanvas({ sceneId, accentColor }: Stroman3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // States
  const [useFallback, setUseFallback] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isWireframe, setIsWireframe] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Three.js Refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const rotationTargetRef = useRef({ x: 0.15, y: -0.4 });
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  // 1. KHỞI TẠO THREE.JS SCENE VỚI CƠ CHẾ BẢO VỆ CHỐNG CRASH WEBGL
  useEffect(() => {
    // Kiểm tra tính khả dụng của WebGL trước khi khởi tạo
    if (!isWebGLAvailable()) {
      setUseFallback(true);
      return;
    }

    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
        powerPreference: "default",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      rendererRef.current = renderer;
    } catch (error) {
      // Nếu WebGL bị disabled bởi GPU hoặc trình duyệt -> Chuyển sang chế độ dự phòng an toàn
      console.warn("WebGL is disabled or not supported on this device. Switching to high-performance 3D fallback mode.", error);
      setUseFallback(true);
      return;
    }

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 7.8);
    cameraRef.current = camera;

    // Model Group
    const rootModelGroup = new THREE.Group();
    scene.add(rootModelGroup);
    modelGroupRef.current = rootModelGroup;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.0);
    fillLight.position.set(-6, -2, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x00ffaa, 1.8);
    rimLight.position.set(0, 5, -6);
    scene.add(rimLight);

    // Floor Platform
    const floorGeom = new THREE.CylinderGeometry(2.8, 2.8, 0.05, 48);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x070c18,
      roughness: 0.4,
      metalness: 0.8,
      transparent: true,
      opacity: 0.4,
    });
    const floor = new THREE.Mesh(floorGeom, floorMat);
    floor.position.y = -2.2;
    scene.add(floor);

    const floorRingGeom = new THREE.RingGeometry(2.6, 2.7, 48);
    const floorRingMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    });
    const floorRing = new THREE.Mesh(floorRingGeom, floorRingMat);
    floorRing.rotation.x = Math.PI / 2;
    floorRing.position.y = -2.18;
    scene.add(floorRing);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (rootModelGroup) {
        if (isAutoRotate && !isDraggingRef.current) {
          rotationTargetRef.current.y += 0.005;
        }

        rootModelGroup.rotation.y +=
          (rotationTargetRef.current.y - rootModelGroup.rotation.y) * 0.08;
        rootModelGroup.rotation.x +=
          (rotationTargetRef.current.x - rootModelGroup.rotation.x) * 0.08;
        rootModelGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      renderer.dispose();
    };
  }, [isAutoRotate]);

  // 2. CHUYỂN ĐỔI MÔ HÌNH KHI SCENE THAY ĐỔI
  useEffect(() => {
    if (useFallback || !modelGroupRef.current) return;
    const rootGroup = modelGroupRef.current;

    while (rootGroup.children.length > 0) {
      rootGroup.remove(rootGroup.children[0]);
    }

    let newModel: THREE.Group;
    switch (sceneId) {
      case "hdpe":
        newModel = buildHdpe3DModel();
        break;
      case "upvc":
        newModel = buildUpvc3DModel();
        break;
      case "ppr":
        newModel = buildPpr3DModel();
        break;
      case "electric":
        newModel = buildConduit3DModel();
        break;
      default:
        newModel = buildHdpe3DModel();
    }

    newModel.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => (m.wireframe = isWireframe));
        } else {
          child.material.wireframe = isWireframe;
        }
      }
    });

    rotationTargetRef.current = { x: 0.18, y: -0.45 };
    rootGroup.rotation.set(0.18, -0.45, 0);

    newModel.scale.set(0.6, 0.6, 0.6);
    rootGroup.add(newModel);

    let scaleProgress = 0.6;
    const scaleInterval = setInterval(() => {
      scaleProgress += 0.08;
      if (scaleProgress >= 1.0) {
        newModel.scale.set(1.0, 1.0, 1.0);
        clearInterval(scaleInterval);
      } else {
        newModel.scale.set(scaleProgress, scaleProgress, scaleProgress);
      }
    }, 16);

    return () => clearInterval(scaleInterval);
  }, [sceneId, isWireframe, useFallback]);

  // Mouse interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    rotationTargetRef.current.y += deltaX * 0.01;
    rotationTargetRef.current.x = Math.max(
      -0.6,
      Math.min(0.8, rotationTargetRef.current.x + deltaY * 0.01)
    );
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Fallback 3D Interactive Mouse Move
  const handleFallbackMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    setMousePos({ x, y });
  };

  const currentFallback = FALLBACK_PRODUCTS[sceneId] || FALLBACK_PRODUCTS.hdpe;

  // ==================== TRƯỜNG HỢP 1: WEBGL BỊ TẮT -> CHẾ ĐỘ 3D ISOMETRIC INTERACTIVE ====================
  if (useFallback) {
    return (
      <div
        className="relative w-full h-full min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] flex items-center justify-center select-none perspective-1200 cursor-pointer"
        onMouseMove={handleFallbackMouseMove}
        onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      >
        {/* Holographic 3D Platform Pedestal */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[340px] sm:w-[420px] lg:w-[480px] h-[130px] pointer-events-none"
          style={{
            transform: "translateX(-50%) rotateX(68deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/50 animate-spin" style={{ animationDuration: "25s" }} />
          <div className="absolute inset-4 rounded-full border border-emerald-500/60 shadow-[0_0_30px_rgba(0,108,65,0.4)]" />
          <div className="absolute inset-8 rounded-full bg-radial from-emerald-500/20 to-transparent blur-md" />
        </div>

        {/* 3D Floating Product Layer */}
        <div
          className="relative z-20 flex items-center justify-center transform-style-3d transition-transform duration-200 ease-out"
          style={{
            transform: `rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg) translateZ(30px)`,
          }}
        >
          {/* Realistic Dynamic Shadow */}
          <div
            className="absolute -bottom-8 w-3/4 h-12 rounded-full bg-black/80 blur-xl pointer-events-none transition-transform duration-300"
            style={{
              transform: `translateX(${-mousePos.x * 1.5}px) scale(${1 - Math.abs(mousePos.y) * 0.02})`,
            }}
          />

          {/* Floating Product Image */}
          <img
            src={currentFallback.image}
            alt={currentFallback.name}
            className="max-h-[260px] sm:max-h-[300px] lg:max-h-[340px] w-auto object-contain filter drop-shadow-[0_25px_45px_rgba(0,108,65,0.5)] animate-hero-float"
          />
        </div>

        {/* Compatible Mode Badge Indicator */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-1.5 backdrop-blur-md shadow-xl text-xs text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-medium text-[11px]">3D Interactive (Tối ưu GPU)</span>
        </div>

        {/* 3D Interaction Hint */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none z-20">
          <div className="px-3.5 py-1 rounded-full bg-slate-900/85 border border-slate-700/60 text-slate-300 text-[11px] font-mono tracking-wide backdrop-blur-md shadow-lg flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>Rê chuột để nghiêng 3D • Chạm để đổi góc nhìn</span>
          </div>
        </div>
      </div>
    );
  }

  // ==================== TRƯỜNG HỢP 2: WEBGL KHẢ DỤNG -> THREE.JS CANVAS 360° ====================
  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <canvas ref={canvasRef} className="w-full h-full block outline-hidden" />

      {/* Floating 3D Toolbar */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 bg-slate-900/85 border border-slate-700/80 rounded-xl p-1.5 backdrop-blur-md shadow-xl">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsAutoRotate((prev) => !prev);
          }}
          className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
            isAutoRotate
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
          title={isAutoRotate ? "Tắt tự động xoay 360°" : "Bật tự động xoay 360°"}
          aria-label="Tự động xoay 3D"
        >
          <RotateCw className={`w-4 h-4 ${isAutoRotate ? "animate-spin" : ""}`} style={{ animationDuration: "8s" }} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsWireframe((prev) => !prev);
          }}
          className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
            isWireframe
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
          title={isWireframe ? "Tắt chế độ khung dây CAD" : "Bật chế độ khung dây CAD"}
          aria-label="Khung dây CAD 3D"
        >
          <Layers className="w-4 h-4" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            rotationTargetRef.current = { x: 0.18, y: -0.45 };
          }}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          title="Đưa về góc phối cảnh chuẩn"
          aria-label="Góc nhìn chuẩn"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none z-20">
        <div className="px-3.5 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 text-slate-300 text-[11px] font-mono tracking-wide backdrop-blur-md shadow-lg flex items-center gap-1.5 opacity-75 hover:opacity-100 transition-opacity">
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <span>Kéo chuột để xoay 3D • 360° Interactive Orbit</span>
        </div>
      </div>
    </div>
  );
}

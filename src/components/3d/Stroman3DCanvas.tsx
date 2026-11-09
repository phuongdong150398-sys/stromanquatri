"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RotateCw, Maximize2, Layers, Eye } from "lucide-react";
import { buildHdpe3DModel } from "./models/HdpeModel3D";
import { buildUpvc3DModel } from "./models/UpvcModel3D";
import { buildPpr3DModel } from "./models/PprModel3D";
import { buildConduit3DModel } from "./models/ConduitModel3D";

interface Stroman3DCanvasProps {
  sceneId: "hdpe" | "upvc" | "ppr" | "electric";
  accentColor: string;
}

export function Stroman3DCanvas({ sceneId, accentColor }: Stroman3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // States điều khiển tương tác 3D
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isWireframe, setIsWireframe] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  // Refs lưu trữ Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const currentModelMeshRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const spotLightRef = useRef<THREE.SpotLight | null>(null);

  // Ref lưu góc xoay tương tác
  const rotationTargetRef = useRef({ x: 0.15, y: -0.4 });
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  // 1. KHỞI TẠO THREE.JS SCENE, CAMERA, LIGHTS & RENDERER
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera phối cảnh chiều sâu
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 7.8);
    cameraRef.current = camera;

    // WebGL Renderer với Anti-aliasing chất lượng cao
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;

    // Root Group chứa mô hình 3D
    const rootModelGroup = new THREE.Group();
    scene.add(rootModelGroup);
    modelGroupRef.current = rootModelGroup;

    // 2. HỆ THỐNG ÁNH SÁNG STUDIO KỸ THUẬT (STUDIO LIGHTING RIG)
    // Ambient light dịu nhẹ
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Directional Light chính (Key light từ trên cao bên phải)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    // Fill Light màu xanh nhẹ từ bên trái tạo chiều sâu
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.0);
    fillLight.position.set(-6, -2, 4);
    scene.add(fillLight);

    // Rim / Back light phản chiếu vành mép ống nhựa
    const rimLight = new THREE.DirectionalLight(0x00ffaa, 1.8);
    rimLight.position.set(0, 5, -6);
    scene.add(rimLight);

    // Dynamic Spotlight chiếu thẳng vào sản phẩm
    const spotLight = new THREE.SpotLight(0xffffff, 2.5);
    spotLight.position.set(0, 6, 4);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.8;
    scene.add(spotLight);
    spotLightRef.current = spotLight;

    // Sàn phản chiếu 3D dạng elip kỹ thuật
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

    // Vòng tròn neon trang trí sàn
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

    // 3. ANIMATION RENDER LOOP (60 FPS)
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      if (rootModelGroup) {
        // Tự động xoay khi không kéo chuột
        if (isAutoRotate && !isDraggingRef.current) {
          rotationTargetRef.current.y += 0.005;
        }

        // Nội suy mượt mà (Smooth damping) đến góc xoay mục tiêu
        rootModelGroup.rotation.y +=
          (rotationTargetRef.current.y - rootModelGroup.rotation.y) * 0.08;
        rootModelGroup.rotation.x +=
          (rotationTargetRef.current.x - rootModelGroup.rotation.x) * 0.08;

        // Bồng bềnh nhẹ nhàng theo trục Y
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

    // Clean up
    return () => {
      resizeObserver.disconnect();
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      renderer.dispose();
    };
  }, [isAutoRotate]);

  // 4. CHUYỂN ĐỔI MÔ HÌNH KHI SCENE THAY ĐỔI
  useEffect(() => {
    if (!modelGroupRef.current) return;
    const rootGroup = modelGroupRef.current;

    // Xóa mô hình cũ
    while (rootGroup.children.length > 0) {
      const child = rootGroup.children[0];
      rootGroup.remove(child);
    }

    // Dựng mô hình 3D tương ứng
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

    // Áp dụng Wireframe nếu đang bật
    newModel.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => (m.wireframe = isWireframe));
        } else {
          child.material.wireframe = isWireframe;
        }
      }
    });

    // Reset góc quay ban đầu cho từng cảnh
    rotationTargetRef.current = { x: 0.18, y: -0.45 };
    rootGroup.rotation.set(0.18, -0.45, 0);

    // Hiệu ứng xuất hiện (Scale in)
    newModel.scale.set(0.6, 0.6, 0.6);
    rootGroup.add(newModel);
    currentModelMeshRef.current = newModel;

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
  }, [sceneId, isWireframe]);

  // 5. XỬ LÝ SỰ KIỆN KÉO CHUỘT / CẢM ỨNG ĐỂ XOAY 3D TỰ DO
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    setIsUserInteracting(true);
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    rotationTargetRef.current.y += deltaX * 0.01;
    // Giới hạn góc nghiêng trục X tránh lộn ngược
    rotationTargetRef.current.x = Math.max(
      -0.6,
      Math.min(0.8, rotationTargetRef.current.x + deltaY * 0.01)
    );

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setTimeout(() => setIsUserInteracting(false), 1200);
  };

  // Touch support trên điện thoại
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      setIsUserInteracting(true);
      previousMousePositionRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;

    const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
    const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

    rotationTargetRef.current.y += deltaX * 0.012;
    rotationTargetRef.current.x = Math.max(
      -0.6,
      Math.min(0.8, rotationTargetRef.current.x + deltaY * 0.012)
    );

    previousMousePositionRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    setTimeout(() => setIsUserInteracting(false), 1200);
  };

  // Reset góc nhìn
  const handleResetView = () => {
    rotationTargetRef.current = { x: 0.18, y: -0.45 };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Canvas WebGL */}
      <canvas ref={canvasRef} className="w-full h-full block outline-hidden" />

      {/* FLOATING 3D ACTION TOOLBAR */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 bg-slate-900/85 border border-slate-700/80 rounded-xl p-1.5 backdrop-blur-md shadow-xl">
        {/* Toggle Auto-Rotate */}
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

        {/* Toggle Wireframe CAD Mode */}
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

        {/* Reset View */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleResetView();
          }}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          title="Đưa về góc phối cảnh chuẩn"
          aria-label="Góc nhìn chuẩn"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* 3D INTERACTION HINT OVERLAY */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none z-20">
        <div className="px-3.5 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 text-slate-300 text-[11px] font-mono tracking-wide backdrop-blur-md shadow-lg flex items-center gap-1.5 opacity-75 hover:opacity-100 transition-opacity">
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <span>Kéo chuột để xoay 3D • 360° Interactive Orbit</span>
        </div>
      </div>
    </div>
  );
}

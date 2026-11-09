import * as THREE from "three";
import { createHollowCylinderGeometry } from "./HdpeModel3D";

/**
 * Dựng mô hình 3D thực thụ cho dòng Ống Nhựa PP-R Chịu Nhiệt & Kháng Khuẩn Ströman
 * Kết hợp cấu trúc 3 lớp (Nano Silver) và phụ kiện Ren Đồng Thau cao cấp
 */
export function buildPpr3DModel(): THREE.Group {
  const group = new THREE.Group();
  group.name = "ppr_model_root";

  // 1. VẬT LIỆU NHỰA PP-R XANH RÊU STRÖMAN (Chịu nhiệt 95°C, chống ăn mòn)
  const pprGreenMaterial = new THREE.MeshStandardMaterial({
    color: 0x007848, // Màu xanh lá Ströman chính hãng
    roughness: 0.28,
    metalness: 0.1,
  });

  // Lớp trong Nano Bạc (Nano Silver 3 lớp - ánh bạc kim loại diệt khuẩn)
  const nanoSilverMaterial = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    roughness: 0.15,
    metalness: 0.75, // Ánh kim loại Nano Silver cao cấp
    emissive: 0x1e293b,
    emissiveIntensity: 0.15,
  });

  // Lớp giữa nhựa chịu lực (Trắng sữa / xanh dương nhạt)
  const middleLayerMaterial = new THREE.MeshStandardMaterial({
    color: 0x34d399,
    roughness: 0.25,
    metalness: 0.1,
  });

  // Vật liệu Ren Đồng Thau CNC (Brass Thread Fitting mạ cao cấp)
  const brassMaterial = new THREE.MeshStandardMaterial({
    color: 0xd97706, // Vàng kim loại đồng thau
    roughness: 0.22,
    metalness: 0.88, // Kim loại thật
    emissive: 0x78350f,
    emissiveIntensity: 0.2,
  });

  // 2. THÂN ỐNG PP-R CHÍNH (Đường kính Ø32, dài 4.2)
  const outerR = 1.15;
  const middleR = 1.0;
  const innerR = 0.82;
  const pipeLength = 4.2;

  // Lớp ngoài xanh Ströman
  const outerPipeGeom = createHollowCylinderGeometry(outerR, middleR, pipeLength);
  const outerPipe = new THREE.Mesh(outerPipeGeom, pprGreenMaterial);
  outerPipe.rotation.x = Math.PI / 2;
  outerPipe.castShadow = true;
  group.add(outerPipe);

  // Lớp giữa chịu lực
  const middlePipeGeom = createHollowCylinderGeometry(middleR, innerR, pipeLength * 1.002);
  const middlePipe = new THREE.Mesh(middlePipeGeom, middleLayerMaterial);
  middlePipe.rotation.x = Math.PI / 2;
  group.add(middlePipe);

  // Lớp trong Nano Bạc
  const nanoPipeGeom = createHollowCylinderGeometry(innerR, innerR - 0.08, pipeLength * 1.005);
  const nanoPipe = new THREE.Mesh(nanoPipeGeom, nanoSilverMaterial);
  nanoPipe.rotation.x = Math.PI / 2;
  group.add(nanoPipe);

  // Sọc nhận diện nước nóng chịu nhiệt (Sọc đỏ/xanh) chạy dọc thân ống
  const redHotStripeMaterial = new THREE.MeshStandardMaterial({
    color: 0xef4444, // Sọc đỏ nước nóng
    roughness: 0.3,
    metalness: 0.1,
  });
  for (let i = 0; i < 2; i++) {
    const angle = i * Math.PI;
    const stripeGeom = new THREE.BoxGeometry(0.06, 0.02, pipeLength * 0.98);
    const stripeMesh = new THREE.Mesh(stripeGeom, redHotStripeMaterial);
    stripeMesh.position.x = Math.cos(angle) * (outerR + 0.01);
    stripeMesh.position.y = Math.sin(angle) * (outerR + 0.01);
    stripeMesh.rotation.z = angle;
    group.add(stripeMesh);
  }

  // 3. ĐẦU NỐI REN ĐỒNG THAU 3D (BRASS MALE THREAD FITTING)
  const brassGroup = new THREE.Group();
  brassGroup.position.z = pipeLength / 2 + 0.5;

  // Khối đai lục giác để vặn cờ-lê (Hexagonal nut collar)
  const hexNutGeom = new THREE.CylinderGeometry(1.3, 1.3, 0.45, 6);
  const hexNutMesh = new THREE.Mesh(hexNutGeom, brassMaterial);
  hexNutMesh.rotation.x = Math.PI / 2;
  brassGroup.add(hexNutMesh);

  // Thân ren tiện các đường rãnh ren xoắn ốc CNC
  const threadBodyGeom = new THREE.CylinderGeometry(1.05, 1.05, 0.8, 36);
  const threadBody = new THREE.Mesh(threadBodyGeom, brassMaterial);
  threadBody.rotation.x = Math.PI / 2;
  threadBody.position.z = 0.55;
  brassGroup.add(threadBody);

  // Các gờ ren nổi CNC
  const threadRingsCount = 6;
  for (let r = 0; r < threadRingsCount; r++) {
    const ringGeom = new THREE.TorusGeometry(1.06, 0.04, 8, 36);
    const ringMesh = new THREE.Mesh(ringGeom, brassMaterial);
    ringMesh.position.z = 0.25 + r * 0.11;
    brassGroup.add(ringMesh);
  }

  // Lỗ ren đồng rỗng ruột thông suốt
  const brassHoleGeom = createHollowCylinderGeometry(1.04, 0.82, 1.4);
  const brassHoleMesh = new THREE.Mesh(brassHoleGeom, brassMaterial);
  brassHoleMesh.rotation.x = Math.PI / 2;
  brassHoleMesh.position.z = 0.3;
  brassGroup.add(brassHoleMesh);

  group.add(brassGroup);

  // 4. CĂN CHỈNH GÓC NHÌN ĐỂ NHÌN THẤY MẶT CẮT VÀ ĐẦU REN ĐỒNG
  group.position.set(0, 0, 0);
  group.rotation.set(0.2, -0.42, 0.06);

  return group;
}

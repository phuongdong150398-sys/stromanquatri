import * as THREE from "three";

/**
 * Dựng mô hình 3D thực thụ cho dòng Ống Luồn Dây Điện uPVC Chống Cháy Ströman
 * Uốn lượn góc cua 90 độ và lõi năng lượng phát sáng bên trong bảo vệ cáp điện
 */
export function buildConduit3DModel(): THREE.Group {
  const group = new THREE.Group();
  group.name = "conduit_model_root";

  // 1. VẬT LIỆU NHỰA uPVC TRẮNG SỨ CHỐNG CHÁY (Chịu nén 750N, tự tắt lửa)
  const conduitMaterial = new THREE.MeshStandardMaterial({
    color: 0xf3f4f6, // Màu trắng sứ cao cấp của ống luồn Stroman
    roughness: 0.24,
    metalness: 0.05,
    transparent: true,
    opacity: 0.95,
  });

  // Vật liệu lõi cáp năng lượng phát sáng bên trong
  const energyCableMaterial = new THREE.MeshStandardMaterial({
    color: 0xf59e0b, // Màu vàng cam điện năng
    emissive: 0xd97706,
    emissiveIntensity: 0.6,
    roughness: 0.2,
    metalness: 0.8,
  });

  const secondaryCableMaterial = new THREE.MeshStandardMaterial({
    color: 0x06b6d4, // Cáp xanh dương
    emissive: 0x0891b2,
    emissiveIntensity: 0.5,
    roughness: 0.2,
    metalness: 0.8,
  });

  // 2. TẠO ĐƯỜNG CONG UỐN LƯỢN 90 ĐỘ CHO ỐNG LUỒN
  const pipeCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.2, -1.2, -0.6),
    new THREE.Vector3(-1.0, -1.0, -0.2),
    new THREE.Vector3(0.0, -0.2, 0.4),
    new THREE.Vector3(0.8, 0.8, 0.2),
    new THREE.Vector3(1.6, 1.4, -0.4),
    new THREE.Vector3(2.2, 1.6, -1.0),
  ]);

  // Vỏ ngoài ống luồn uPVC
  const outerTubeGeom = new THREE.TubeGeometry(pipeCurve, 64, 0.72, 32, false);
  const outerTube = new THREE.Mesh(outerTubeGeom, conduitMaterial);
  outerTube.castShadow = true;
  group.add(outerTube);

  // 3. 2 DÂY CÁP ĐIỆN BÊN TRONG LÒNG ỐNG (Minh họa cáp được bảo vệ)
  // Dây cáp 1
  const cableCurve1 = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.2, -1.15, -0.55),
    new THREE.Vector3(-1.0, -0.95, -0.15),
    new THREE.Vector3(0.0, -0.15, 0.45),
    new THREE.Vector3(0.8, 0.85, 0.25),
    new THREE.Vector3(1.6, 1.45, -0.35),
    new THREE.Vector3(2.2, 1.65, -0.95),
  ]);
  const cableGeom1 = new THREE.TubeGeometry(cableCurve1, 64, 0.16, 16, false);
  const cableMesh1 = new THREE.Mesh(cableGeom1, energyCableMaterial);
  group.add(cableMesh1);

  // Dây cáp 2
  const cableCurve2 = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.2, -1.25, -0.65),
    new THREE.Vector3(-1.0, -1.05, -0.25),
    new THREE.Vector3(0.0, -0.25, 0.35),
    new THREE.Vector3(0.8, 0.75, 0.15),
    new THREE.Vector3(1.6, 1.35, -0.45),
    new THREE.Vector3(2.2, 1.55, -1.05),
  ]);
  const cableGeom2 = new THREE.TubeGeometry(cableCurve2, 64, 0.16, 16, false);
  const cableMesh2 = new THREE.Mesh(cableGeom2, secondaryCableMaterial);
  group.add(cableMesh2);

  // 4. KHỚP NỐI REN / KHỚP NỐI MĂNG SÔNG Ở 2 ĐẦU ỐNG
  const collarMaterial = new THREE.MeshStandardMaterial({
    color: 0xe5e7eb,
    roughness: 0.3,
    metalness: 0.1,
  });

  const collar1 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.82, 0.82, 0.5, 32),
    collarMaterial
  );
  collar1.position.set(-2.0, -1.15, -0.55);
  collar1.rotation.z = Math.PI / 4;
  group.add(collar1);

  const collar2 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.82, 0.82, 0.5, 32),
    collarMaterial
  );
  collar2.position.set(2.0, 1.55, -0.95);
  collar2.rotation.z = Math.PI / 6;
  group.add(collar2);

  // 5. CĂN CHỈNH TÂM VÀ GÓC PHỐI CẢNH 3D
  group.position.set(0, 0, 0);
  group.rotation.set(0.15, -0.35, 0.04);

  return group;
}

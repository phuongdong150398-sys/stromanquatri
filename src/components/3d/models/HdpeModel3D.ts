import * as THREE from "three";

/**
 * Tạo hình học ống rỗng ruột 3D (Hollow Cylinder) có độ dày thành ống
 */
export function createHollowCylinderGeometry(
  outerRadius: number,
  innerRadius: number,
  height: number,
  radialSegments: number = 64
): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  // Vành ngoài
  shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);

  // Lỗ khoét rỗng bên trong
  const hole = new THREE.Path();
  hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    steps: 1,
    depth: height,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.04,
    bevelSegments: 4,
  };

  const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geom.center();
  return geom;
}

/**
 * Dựng mô hình 3D thực thụ cho dòng Ống Nhựa HDPE Ströman PE100
 */
export function buildHdpe3DModel(): THREE.Group {
  const group = new THREE.Group();
  group.name = "hdpe_model_root";

  // 1. VẬT LIỆU NHỰA PE100 NGUYÊN SINH ĐEN NHÁM CAO CẤP
  const hdpeMaterial = new THREE.MeshStandardMaterial({
    color: 0x121418, // Đen tuyền bóng mờ đặc trưng của HDPE
    roughness: 0.35,
    metalness: 0.15,
  });

  // Vật liệu sọc xanh PE100 nhận diện chuẩn ISO 4427
  const blueStripeMaterial = new THREE.MeshStandardMaterial({
    color: 0x0080ff, // Xanh dương sáng PE100
    roughness: 0.25,
    metalness: 0.2,
    emissive: 0x003366,
    emissiveIntensity: 0.2,
  });

  // 2. ỐNG HDPE CHÍNH (Đường kính lớn Ø110)
  const mainOuterR = 1.35;
  const mainInnerR = 1.1; // Thể hiện độ dày thành ống PN16 cực kỳ chắc chắn
  const mainLength = 5.2;

  const mainPipeGeom = createHollowCylinderGeometry(mainOuterR, mainInnerR, mainLength);
  const mainPipe = new THREE.Mesh(mainPipeGeom, hdpeMaterial);
  mainPipe.rotation.x = Math.PI / 2; // Đặt nằm theo phối cảnh
  mainPipe.castShadow = true;
  mainPipe.receiveShadow = true;
  group.add(mainPipe);

  // 4 Đường sọc xanh chạy dọc thân ống chính (90 độ quanh ống)
  const stripeAngleSteps = 4;
  for (let i = 0; i < stripeAngleSteps; i++) {
    const angle = (i * Math.PI) / 2;
    const stripeGeom = new THREE.BoxGeometry(0.08, 0.03, mainLength * 0.99);
    const stripeMesh = new THREE.Mesh(stripeGeom, blueStripeMaterial);
    stripeMesh.position.x = Math.cos(angle) * (mainOuterR + 0.01);
    stripeMesh.position.y = Math.sin(angle) * (mainOuterR + 0.01);
    stripeMesh.rotation.z = angle;
    group.add(stripeMesh);
  }

  // 3. ỐNG PHỤ Ø63 (Nằm song song phía sau tạo chiều sâu cụm sản phẩm)
  const subOuterR = 0.8;
  const subInnerR = 0.65;
  const subLength = 4.4;
  const subPipeGeom = createHollowCylinderGeometry(subOuterR, subInnerR, subLength);
  const subPipe = new THREE.Mesh(subPipeGeom, hdpeMaterial);
  subPipe.position.set(1.4, -0.6, -1.0);
  subPipe.rotation.x = Math.PI / 2;
  subPipe.castShadow = true;
  group.add(subPipe);

  for (let i = 0; i < stripeAngleSteps; i++) {
    const angle = (i * Math.PI) / 2 + Math.PI / 4;
    const stripeGeom = new THREE.BoxGeometry(0.05, 0.02, subLength * 0.99);
    const stripeMesh = new THREE.Mesh(stripeGeom, blueStripeMaterial);
    stripeMesh.position.set(
      subPipe.position.x + Math.cos(angle) * (subOuterR + 0.01),
      subPipe.position.y + Math.sin(angle) * (subOuterR + 0.01),
      subPipe.position.z
    );
    stripeMesh.rotation.z = angle;
    group.add(stripeMesh);
  }

  // 4. ĐOẠN ỐNG CUỘN 3D HDPE (Torus Pipe Coil đại diện cho dạng cuộn 100m)
  const coilCurve = new THREE.TorusGeometry(1.4, 0.22, 24, 64, Math.PI * 1.6);
  const coilMesh = new THREE.Mesh(coilCurve, hdpeMaterial);
  coilMesh.position.set(-1.8, 0.4, 0.8);
  coilMesh.rotation.x = 1.1;
  coilMesh.rotation.y = -0.5;
  coilMesh.castShadow = true;
  group.add(coilMesh);

  // 5. CĂN CHỈNH TÂM VÀ GÓC NGHIÊNG ĐẸP
  group.position.set(0, 0, 0);
  group.rotation.set(0.15, -0.4, 0.05);

  return group;
}

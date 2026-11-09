import * as THREE from "three";
import { createHollowCylinderGeometry } from "./HdpeModel3D";

/**
 * Dựng mô hình 3D thực thụ cho dòng Ống Nhựa uPVC Ströman Chuẩn Đức
 * Bao gồm thân ống, đầu nong loe rộng, gioăng cao su chống rò rỉ và phụ kiện đồng bộ
 */
export function buildUpvc3DModel(): THREE.Group {
  const group = new THREE.Group();
  group.name = "upvc_model_root";

  // 1. VẬT LIỆU uPVC XÁM KỸ THUẬT CHUẨN ĐỨC (Mịn, bóng nhẹ, kháng hóa chất)
  const upvcMaterial = new THREE.MeshStandardMaterial({
    color: 0x8a9ba8, // Xám xanh kỹ thuật đặc trưng của uPVC Stroman
    roughness: 0.22,
    metalness: 0.08,
  });

  // Lòng ống siêu nhẵn bóng (Hazen-Williams C = 150)
  const innerLiningMaterial = new THREE.MeshStandardMaterial({
    color: 0x9fb3c2,
    roughness: 0.12,
    metalness: 0.05,
    side: THREE.DoubleSide,
  });

  // Gioăng cao su đàn hồi màu đen tuyền
  const rubberGasketMaterial = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.85,
    metalness: 0.02,
  });

  // 2. THÂN ỐNG CHÍNH uPVC (Đường kính Ø110, dài 4.8)
  const outerR = 1.3;
  const innerR = 1.12; // Độ dày thành ống chuẩn Class 2 / Class 3
  const pipeLength = 3.6;

  const mainPipeGeom = createHollowCylinderGeometry(outerR, innerR, pipeLength);
  const mainPipe = new THREE.Mesh(mainPipeGeom, upvcMaterial);
  mainPipe.rotation.x = Math.PI / 2;
  mainPipe.position.z = -0.6;
  mainPipe.castShadow = true;
  group.add(mainPipe);

  // 3. ĐẦU NONG LOE RỘNG (BELL-END SOCKET) ĐẶC TRƯNG uPVC
  const socketOuterR = 1.48;
  const socketInnerR = 1.32; // Vừa vặn để ngậm thân ống khác
  const socketLength = 1.4;

  const socketGeom = createHollowCylinderGeometry(socketOuterR, socketInnerR, socketLength);
  const socketMesh = new THREE.Mesh(socketGeom, upvcMaterial);
  socketMesh.rotation.x = Math.PI / 2;
  socketMesh.position.z = 1.8;
  socketMesh.castShadow = true;
  group.add(socketMesh);

  // Vành chuyển tiếp hình nón (Conical collar) giữa thân ống và đầu nong
  const collarGeom = new THREE.CylinderGeometry(socketOuterR, outerR, 0.4, 48, 1, false);
  const collarMesh = new THREE.Mesh(collarGeom, upvcMaterial);
  collarMesh.rotation.x = Math.PI / 2;
  collarMesh.position.z = 1.0;
  group.add(collarMesh);

  // 4. GIOĂNG CAO SU KHÓA KÍN NƯỚC (RUBBER SEAL RING) BÊN TRONG ĐẦU NONG
  const gasketGeom = new THREE.TorusGeometry(socketInnerR - 0.02, 0.08, 16, 48);
  const gasketMesh = new THREE.Mesh(gasketGeom, rubberGasketMaterial);
  gasketMesh.position.z = 1.8;
  group.add(gasketMesh);

  // 5. ĐOẠN ỐNG THỨ 2 LỒNG VÀO ĐẦU NONG (Minh họa mối nối không rò rỉ)
  const secondPipeGeom = createHollowCylinderGeometry(outerR * 0.98, innerR * 0.98, 2.0);
  const secondPipe = new THREE.Mesh(secondPipeGeom, upvcMaterial);
  secondPipe.rotation.x = Math.PI / 2;
  secondPipe.position.z = 2.9;
  secondPipe.castShadow = true;
  group.add(secondPipe);

  // 6. PHỤ KIỆN uPVC ĐỒNG BỘ: CÚT 90 ĐỘ ĐẶT BÊN CẠNH
  const elbowTorusGeom = new THREE.TorusGeometry(0.9, 0.35, 24, 32, Math.PI / 2);
  const elbowMesh = new THREE.Mesh(elbowTorusGeom, upvcMaterial);
  elbowMesh.position.set(-1.8, -0.6, 0.2);
  elbowMesh.rotation.set(0.4, 0.3, -0.2);
  elbowMesh.castShadow = true;
  group.add(elbowMesh);

  // Căn chỉnh góc nhìn 3D trực quan
  group.position.set(0, 0, 0);
  group.rotation.set(0.18, -0.45, 0.08);

  return group;
}

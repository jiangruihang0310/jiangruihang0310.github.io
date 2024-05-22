import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

let flag = false;
let model; // 添加一个全局变量来存储模型对象
export function initExplodeModel(modelObject) {
	model = modelObject;
	const modelBox3 = new THREE.Box3();
  const meshBox3 = new THREE.Box3();

  modelBox3.setFromObject(model);
  const explodeCenter = modelBox3.getCenter(new THREE.Vector3());

  model.traverse(function (value) {
    if (value.isMark || value.isMarkChild || value.isLine || value.isSprite) return;
    if (value.isMesh) {
      meshBox3.setFromObject(value);

      if (!flag) {
        value.userData.originPosition = value.position.clone();
      }
      const meshCenter = meshBox3.getCenter(new THREE.Vector3());
      value.userData.worldDir = new THREE.Vector3().subVectors(meshCenter, explodeCenter).normalize();
      value.userData.worldDistance = new THREE.Vector3().subVectors(meshCenter, explodeCenter);
      value.userData.meshCenter = meshCenter.clone();
      value.userData.explodeCenter = explodeCenter.clone();
    }
  });
}

export function explode() {
	flag = true;

	model.traverse(function (value,Scalar=14) {
	  if (!value.isMesh || !value.userData.originPosition) return;
		//计算爆炸位移距离
	  const distance = value.userData.worldDir.clone().multiplyScalar(value.userData.worldDistance.length() * Scalar);
	  const offset = new THREE.Vector3().subVectors(value.userData.meshCenter, value.userData.originPosition);
	  const center = value.userData.explodeCenter;
	  const newPos = new THREE.Vector3().copy(center).add(distance).sub(offset);
	  const localPosition = value.parent?.worldToLocal(newPos.clone());
		// console.log(localPosition,'localPosition');
	  new TWEEN.Tween(value.position)
		.to(localPosition, 1000)
		.easing(TWEEN.Easing.Linear.None)
		.start();
	});
}

export function reset() {
	flag = false;

	model.traverse((node) => {
	  if (node.isMark || node.isMarkChild || node.isLine || node.isSprite) return;
	  if (node.isMesh) {
		new TWEEN.Tween(node.position)
		  .to(node.userData.originPosition, 1000)
		  .easing(TWEEN.Easing.Linear.None)
		  .start();
	  }
	});
}

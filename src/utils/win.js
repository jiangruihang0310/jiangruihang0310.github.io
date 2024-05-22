import * as THREE from 'three';

export const init = () => {
    const { innerWidth, innerHeight, devicePixelRatio } = window;

    // 摄像机
    const perspective = 800;
    const fov = (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) / Math.PI;
    const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, perspective);

    // 场景
    const scene = new THREE.Scene();

    // 渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(devicePixelRatio);
    renderer.setSize(innerWidth-220, innerHeight-220);
    const layout=document.getElementById('layout')
	layout.appendChild(renderer.domElement);

    // const geometry = new THREE.BoxGeometry(100, 100, 100);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    return { camera, renderer, scene };
}

export const resize = (camera, renderer) => {
    const { innerWidth, innerHeight, devicePixelRatio } = window;
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(devicePixelRatio);
    renderer.setSize(innerWidth, innerHeight);
}
export const destroy = (scene,renderer,animate) => {
	// document.querySelector('canvas').remove()
	scene.clear()
	// light.dispose()
	renderer.dispose()
	renderer.forceContextLoss()
	renderer.content = null
	cancelAnimationFrame(animate) // 去除animationFrame
	// window.removeEventListener('resize', this.onWindowResize)
	// console.log(document.querySelector('#container'));
	document.querySelector('#layout').removeChild(document.querySelector('#layout canvas'))
	const gl = renderer.domElement.getContext('webgl')
	gl && gl.getExtension('WEBGL_lose_context').loseContext()
}
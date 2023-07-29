import {ref} from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import { initExplodeModel } from '@/utils/split'
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader"
import * as TWEEN from '@tweenjs/tween.js'
let scene
let camera
let renderer
let light
let controls
let parentWidth
let parentHeight
let threeDom
let spotLight
let clock
let composer
export function init(dom, skys) {
	parentWidth = dom.clientWidth
	parentHeight = dom.clientHeight
	clock = new THREE.Clock()
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: false,
		precision: "highp"
	})
	renderer.setClearAlpha(0.0)
	renderer.toneMapping = THREE.ACESFilmicToneMapping
	renderer.toneMappingExposure = 2.5
	renderer.shadowMap.enabled = true
	// renderer.extensions=1
	renderer.setPixelRatio(window.devicePixelRatio) // 设置渲染的比例
	renderer.setSize(parentWidth, parentHeight) // 设置渲染的尺寸
	renderer.shadowMap.type = THREE.PCFSoftShadowMap // 阴影类型（处理运用Shadow Map产生的阴影锯齿）
	renderer.physicallyCorrectLights = true;
	dom.appendChild(renderer.domElement)
	camera = new THREE.PerspectiveCamera(45, parentWidth / parentHeight, 1, 20000)
	camera.position.set(-150, 0, 150) //
	// 设置场景
	scene = new THREE.Scene()
	if (skys) {
		sky()
	} else {
		const rgbeLoader = new RGBELoader();
		//资源较大，使用异步加载
		rgbeLoader.loadAsync("static/hdr/warehouse.hdr").then((texture) => {
			texture.mapping = THREE.EquirectangularReflectionMapping;
			//将加载的材质texture设置给背景和环境
			scene.background = texture;
			scene.environment = texture;
		});
	}

	// let ambientLight = new THREE.AmbientLight(0xffffff); //设置环境光
	// ambientLight.position.set(-150,0,150)
	// scene.add(ambientLight); //将环境光添加到场景中
	// let pointLight = new THREE.PointLight(0xffffff, 3, 3);
	// pointLight.position.set(-150, 0, 150); //设置点光源位置
	// scene.add(pointLight); //将点光源添加至场景
	const directionalLight = new THREE.DirectionalLight(
		0xffffff, 3
	)
	directionalLight.position.set(-300, 300, 300); // 将灯光位置设置为模型的中心
    
    scene.add(directionalLight);
    
	// const hemisphereLight=new THREE.HemisphereLight(0xfffff,5)
	// hemisphereLight.position.set(-150,0,150)
	// scene.add(hemisphereLight)
	// // 聚光灯
	// spotLight = new THREE.SpotLight(0xffffff, 5)
	// spotLight.position.set(1, 1, 20)
	// scene.add(spotLight)
	renderer.compile(scene, camera)
	controls = new OrbitControls(camera, renderer.domElement)
	renderer.shadowMapEnabled = true
	// 根据窗口自适应改变
	window.addEventListener('resize', onWindowResize, false)
	// dom.addEventListener('mousedown', onMouseDown, false)
	// scene.add(controls)
}
export const onWindowResize = () => {
	// camera.aspect = parentWidth / window.innerHeight
	camera.aspect = window.innerWidth / window.innerHeight
	renderer.setSize(parentWidth, parentHeight, false)
	renderer.render(scene, camera)
	camera.updateProjectionMatrix()
}

export const sky = () => {
	scene.background = new THREE.CubeTextureLoader()
		.setPath('/static/gltf/sky/')
		.load(['left.jpg', 'right.jpg', 'top.jpg', 'down.jpg', 'front.jpg', 'back.jpg'])
	// .load( ["home1_left.jpg", "home1_right.jpg", "home1_top.jpg", "home1_bottom.jpg", "home1_front.jpg", "home1_back.jpg"] );
}
export const addGLTFHandler = (gltfPath, GltfFile) => {
	const dracoLoader = new DRACOLoader()
	const loader = new GLTFLoader()
	// const textureLoader = new THREE.TextureLoader()
	dracoLoader.setDecoderPath('./static/draco/')
	dracoLoader.setDecoderConfig({ type: 'js' }) // 使用js方式解压
	dracoLoader.preload()
	loader.setDRACOLoader(dracoLoader)
	loader.setMeshoptDecoder(MeshoptDecoder)
	// const textureNormal = textureLoader.load('/static/gltf/a0.jpg')
	// let sphereMaterial = new THREE.MeshLambertMaterial( { envMap: scene.background } );
	// renderer.compile(scene, camera)
	loader.load(
		
		gltfPath,
		(gltf) => {
			// 模型
			initExplodeModel(gltf.scene, gltf.animations)
			gltf.scene.traverse((object) => {
				if (object.isMesh) {
					// 修改模型的材质
					object.geometry.computeVertexNormals();
					// const mesh = new THREE.Mesh(object.geometry, reflectionMaterial);
					// object.parent.add(mesh);
					// 开启反光模式
					// object.material.transparent = true;
        			// object.material.opacity = 15;
					object.castShadow = true
					object.receiveShadow = true
					object.material.reflectivity=1		
					// object.material.emissive = object.material.color
					// object.material.emissiveMap = object.material.map			
				}
			})
			console.log(gltf);
			setScaleToFitSize(gltf.scene)
			center(gltf.scene)
			scene.add(gltf.scene)
		},
		(progress) => {
			console.log(progress);
		}
	)
}

export const render = () => {
	// requestAnimationFrame(render)
	const FPS = 30
	const renderT = 0.000000000001 / FPS // 单位秒  间隔多长时间渲染渲染一次
	let timeS = 0
	const T = clock.getDelta()
	timeS = timeS + T
	// requestAnimationFrame默认调用render函数60次，通过时间判断，降低renderer.render执行频率
	if (timeS > renderT) {
		timeS = 0
		renderer.render(scene, camera)
	}
	// 设置渲染频率为30FBS，也就是每秒调用渲染器render方法大约30次
}
export const setScaleToFitSize = (obj) => {
	// 显示模型的时候自动计算模型缩放比例
	// 计算和世界轴对齐的一个对象 Object3D （含其子对象）的包围盒
	const bBox = new THREE.Box3().setFromObject(obj)
	const height = bBox.max.y - bBox.min.y
	const dist = height / (2 * Math.tan((camera.fov * Math.PI) / 360))
	console.log('模型缩放比例', 50 / dist)
	obj.scale.set(50 / dist, 50 / dist, 50 / dist)
}
export const center = (obj) => {
	const box = new THREE.Box3().setFromObject(obj) // 获取模型的包围盒
	const mdlen = box.max.x - box.min.x // 模型长度
	const mdwid = box.max.z - box.min.z // 模型宽度
	const mdhei = box.max.y - box.min.y // 模型高度
	const x1 = box.min.x + mdlen / 2 // 模型中心点坐标X
	const y1 = box.min.y + mdhei / 2 // 模型中心点坐标Y
	const z1 = box.min.z + mdwid / 2 // 模型中心点坐标Z
	obj.position.set(-x1, -y1, -z1)
}
export const animate = () => {
	requestAnimationFrame(animate)
	const time = Date.now() * 0.0005
	controls.update() // 更新控制器
	TWEEN.update()
	if (window.mixer) {
		window.mixer.update(0.016)
	}
	render()
}
// 释放
export const destroy = () => {
	// document.querySelector('canvas').remove()
	scene.clear()
	controls.dispose()
	camera.remove()
	// light.dispose()
	renderer.dispose()
	renderer.forceContextLoss()
	renderer.content = null
	cancelAnimationFrame(animate) // 去除animationFrame
	// window.removeEventListener('resize', this.onWindowResize)
	const gl = renderer.domElement.getContext('webgl')
	gl && gl.getExtension('WEBGL_lose_context').loseContext()
}
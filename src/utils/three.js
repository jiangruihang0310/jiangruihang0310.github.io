import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import { initExplodeModel } from '@/utils/split'
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader"
import * as TWEEN from '@tweenjs/tween.js'	
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import './pop.css'
import store from '@/store'
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { CSS2DObject, Line2, LineGeometry,CSS2DRenderer } from 'three/examples/jsm/Addons.js';
import { CSS3DRenderer,CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
// import { ElMessage } from 'element-plus';
import { vertexShader, fragmentShader } from '@/config/constant.js'
let scene
let camera
let renderer
let light
let controls
let parentWidth
let parentHeight
let threeDom
let spotLight
// let clock
let composer
let animations
let mixer
let playerMesh
let clock = new THREE.Clock();
let canvasDom
let meshList = []
let model
let outlinePass;
let renderPass;
let effectFXAA;
let smaaPass;
let unrealBloomPass;
let previousPopup = null; // 存储之前的弹窗
let popupTimeout = null; // 存储定时器
const loader = new FontLoader() // 创建字体加载器
let selectedObjects=[]
let objects// console.log(store,'store');
export function init(dom, skys) {
    canvasDom=dom
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
		sky()

		// const rgbeLoader = new RGBELoader();
		// //资源较大，使用异步加载
		// rgbeLoader.loadAsync("static/hdr/warehouse.hdr").then((texture) => {
		// 	texture.mapping = THREE.EquirectangularReflectionMapping;
		// 	//将加载的材质texture设置给背景和环境
		// 	scene.background = texture;
		// 	scene.environment = texture;
		// });
	}

	let ambientLight = new THREE.AmbientLight(0xffffff); //设置环境光
	ambientLight.position.set(-150,0,150)
	scene.add(ambientLight); //将环境光添加到场景中
	let pointLight = new THREE.PointLight(0xffffff, 3, 3);
	pointLight.position.set(-150, 0, 150); //设置点光源位置
	scene.add(pointLight); //将点光源添加至场景
	const directionalLight = new THREE.DirectionalLight(
		0xffffff, 3
	)
	directionalLight.position.set(-150, -0, 150); // 将灯光位置设置为模型的中心
    
    scene.add(directionalLight);

    
	const hemisphereLight=new THREE.HemisphereLight(0xfffff,3)
	hemisphereLight.position.set(-150,0,150)
	scene.add(hemisphereLight)
	// 聚光灯
	spotLight = new THREE.SpotLight(0xffffff, 1)
	spotLight.position.set(1, 1, 20)
	scene.add(spotLight)
	renderer.compile(scene, camera)
	controls = new OrbitControls(camera, renderer.domElement)
	renderer.shadowMapEnabled = true
	// 根据窗口自适应改变
	window.addEventListener('resize', onWindowResize, false)
	dom.addEventListener('click', onMouseDown, false)
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
	const ktx2Loader = new KTX2Loader();
	// const textureLoader = new THREE.TextureLoader()
	// dracoLoader.setDecoderPath("/roadSter/draco/gltf/");
	loader.setDRACOLoader(dracoLoader);
	dracoLoader.setDecoderPath('./static/draco/gltf/')
	dracoLoader.setDecoderConfig({ type: 'js' }) // 使用js方式解压
	dracoLoader.preload()
	loader.setDRACOLoader(dracoLoader)
	loader.setMeshoptDecoder(MeshoptDecoder)
// 设置KTX2加载器
	// loader.setKTX2Loader(ktx2Loader);
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
					meshList.push(object)
					// object.material.emissive = object.material.color
					object.material.emissiveMap = object.material.map		
					object.material.side = THREE.DoubleSide;		
				}
			})
			
			console.log(gltf);
			// gltf.scene.material.side =THREE.DoubleSide
			setScaleToFitSize(gltf.scene)
			center(gltf.scene)
			scene.add(gltf.scene)
			model=gltf.scene
			console.log(gltf.scene.clone(true),'123456789');
			store.commit('model/addModelLists',gltf.scene.clone(true))
		},
		(progress) => {
			// console.log(progress);
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
	if (composer) {
		composer.render(scene, camera);
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
	
	// renderer.render(scene, camera);
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
	// window.removeEventListener('resize',  onWindowResize)
	const gl = renderer.domElement.getContext('webgl')
	gl && gl.getExtension('WEBGL_lose_context').loseContext()
}

function getIntersects(event) {
	event.preventDefault() // 阻止默认的点击事件执行, https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault
	// console.log("event.clientX:" + event.clientX);
	// console.log("event.clientY:" + event.clientY);
	// 声明 rayCaster 和 mouse 变量
	const rayCaster = new THREE.Raycaster()
	const mouse = new THREE.Vector2()
	// 通过鼠标点击位置，计算出raycaster所需点的位置，以屏幕为中心点，范围-1到1
	mouse.x =
		((event.clientX - canvasDom.getBoundingClientRect().left) / canvasDom.offsetWidth) * 2 - 1
	mouse.y =
		-((event.clientY - canvasDom.getBoundingClientRect().top) / canvasDom.offsetHeight) * 2 + 1 // 这里为什么是-号，没有就无法点中
	console.log(mouse.x,mouse.y)
	// 通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
	rayCaster.setFromCamera(mouse, camera)

	// 获取与射线相交的对象数组， 其中的元素按照距离排序，越近的越靠前。
	// +true，是对其后代进行查找，这个在这里必须加，因为模型是由很多部分组成的，后代非常多。
	const intersects = rayCaster.intersectObjects(meshList)
	// console.log(intersects)

	return intersects
}
export function onMouseDown(event) {
	// 获取raycaster和所有模型相交的数组，其中的元素按照距离排序，越近的越靠前
	const intersects = getIntersects(event)
	// 获取选中最近的Mesh对象
	// instance坐标是对象，右边是类，判断对象是不是属于这个类的
	selectedObjects = [];
	if (intersects.length !== 0 && intersects[0].object && intersects[0].object.name !== '') {
		// const colors = intersects[0].object.material.color.getHexString()
		// 保存模型索引
		//   store.dispatch(setMeshIndex(intersects[0].object.setIndex))
		// intersects[0].object.material.color.set(0xff0000)
		// const timer = setTimeout(() => {
		// 	intersects[0].object.material.color.set('#' + colors)
		// 	clearTimeout(timer)
		// }, 100)
		// if (intersects[0].object.type !== 'TransformControlsPlane') {
		//   trans.attach(intersects[0].object)  选中mesh对象并添加TransformControls
		// }
		//   console.log(intersects[0].object)
		deleteDiv()
		const obj = intersects[0].object
		objects=obj
		selectedObjects.push(obj);
		// model=obj
		outlineObj(selectedObjects)
	console.log(obj,'objclick')
		divPop(obj.name, obj.position)
	} else {
		deleteDiv()
		outlineObj(selectedObjects)
		console.log('未选中 Mesh!')
	}
}

function threeToScreen(position, camera) {
	var worldVector = new THREE.Vector3();
	var standardVector = worldVector.project(camera);//世界坐标转标准设备坐标
	const rect = renderer.domElement.getBoundingClientRect();
	var a = window.innerWidth / 2;
	var b = window.innerHeight / 2;
	console.log(standardVector,'xxx')
	var x = Math.round((standardVector.x * rect.width/2) + rect.left + rect.width / 2);//标准设备坐标转屏幕坐标
	var y = Math.round(-(standardVector.y * rect.height/2)  + rect.top + rect.height / 2);//标准设备坐标转屏幕坐标
	return {
		x: x,
		y: y
	};
}

// 弹窗内容与样式	
export function divPop(countryName, V3) {
	console.log(V3.x,'v3.......');
	let rs = threeToScreen(V3,camera); // 调用世界坐标转屏幕坐标函数								
	let div = document.createElement("divCell"); //创建一个div				    
	div.id = "divCell";  //设置ID
	div.innerHTML = `
     <div class="part-name">
            <p>${countryName}</p>
        </div>
    `; //div的内容  
	// div.style.padding = '5px';
	div.style.position = 'absolute';
	div.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
	div.style.color = 'red';
	div.style.left = rs.x + "px";
	div.style.top = rs.y + "px";
	document.body.appendChild(div); //添加到页面 
	// const boxObject = new CSS2DObject(div);
	// console.log(boxObject,'boxObject',V3);
	
    // boxObject.position.set( V3.x,V3.y,V3.z );
    // scene.add(boxObject);
}
// 清除弹窗
export function deleteDiv() {
	//如果原来有“divCell”这个图层，先删除这个图层
	let d = document.getElementById("divCell");
	if (d != null) {
		d.parentNode.removeChild(d);
	}
}
function WorldToScreen(x, y, z) {					
	let worldVector = new THREE.Vector3(x, y, z);
	let vector = worldVector.project(camera); //世界坐标转标准设备坐标
	let w = canvasDom.innerWidth / 2;
	let h = canvasDom.innerHeight / 2;
	return {
		x: Math.round(vector.x * w + w),
		y: Math.round(-vector.y * h + h)
	}
}

export function outlineObj(selectedObject,type) {
	let selectedObjects=selectedObject
	if(type=='list'){
		 selectedObjects=[]
		model.traverse((object)=>{
			if(object.name==selectedObject.name){
				deleteDiv()
				selectedObjects.push(object)
				divPop(object.name,object.position)
			}
		})
	}
	console.log(selectedObjects,'selectedObject');
	// 创建一个EffectComposer（效果组合器）对象，然后在该对象上添加后期处理通道。
	// 用于模型边缘高亮
	composer = new EffectComposer(renderer);
	composer.renderTarget1.texture.outputColorSpace = THREE.sRGBEncoding;
	composer.renderTarget2.texture.outputColorSpace = THREE.sRGBEncoding;
	composer.renderTarget1.texture.encoding = THREE.sRGBEncoding;
	composer.renderTarget2.texture.encoding = THREE.sRGBEncoding;
  
	// 新建一个场景通道  为了覆盖到原来的场景上
	renderPass = new RenderPass(scene, camera);
	composer.addPass(renderPass);
	// 物体边缘发光通道
	outlinePass = new OutlinePass(
	  new THREE.Vector2(window.innerWidth, window.innerHeight),
	  scene,
	  camera,
	  selectedObjects
	);
	outlinePass.selectedObjects = selectedObjects;
	outlinePass.edgeStrength = 10.0; // 边框的亮度
	outlinePass.edgeGlow = 0.5; // 光晕[0,1]
	outlinePass.usePatternTexture = false; // 是否使用父级的材质
	outlinePass.edgeThickness = 1; // 边框宽度
	outlinePass.downSampleRatio = 1; // 边框弯曲度
	outlinePass.pulsePeriod = 2; // 呼吸闪烁的速度
	// outlinePass.visibleEdgeColor.set(0xff00000); // 呼吸显示的颜色
	outlinePass.visibleEdgeColor = new THREE.Color('red') // 可见边缘的颜色
	outlinePass.hiddenEdgeColor = new THREE.Color('red') // 不可见边缘的颜色
	// outlinePass.hiddenEdgeColor = new THREE.Color(0,0,0); // 呼吸消失的颜色
	outlinePass.clear = true;
	composer.addPass(outlinePass);
	// 自定义的着色器通道 作为参数
	// effectFXAA = new ShaderPass(FXAAShader);
	// effectFXAA.uniforms.resolution.value.set(
	//   1 / window.innerWidth,
	//   1 / window.innerHeight
	// );
	// effectFXAA.renderToScreen = true;
	// composer.addPass(effectFXAA);
	// // 抗锯齿
	// smaaPass = new SMAAPass();
	// composer.addPass(smaaPass);
	// // 发光效果
	unrealBloomPass = new UnrealBloomPass();
	unrealBloomPass.strength = 0.1;
	unrealBloomPass.radius = 0;
	unrealBloomPass.threshold = 1;
	composer.addPass(unrealBloomPass);
  
	// scene.background = new THREE.Color(0x1b1824);
  }
  



//   const createBox = async (model) => {
//     removeThatPart()
//     const { size, center } = getBox3Info(model)

//     const cameraPosition = center.clone().addScalar(145)

//     const group = new Group()
//     let moreMesh = moreTrack(group)
//     const box = new BoxGeometry(size.x, size.y, size.z);
//     const mesh = new Mesh(box, bubbleMaterial)
//     let line2 = getLine2ByGeomentry(box)
//     moreMesh.add(mesh)
//     moreMesh.add(line2)

//     let partsObject = { ...mechanicalData, ...BoltMatData }
//     const partName = partsObject[model.name]

//     labelDom = drawPart2Dinfo({
//         name: partName
//     })
//     labelDom.position.setY(30);

//     group.add(labelDom)
//     scene.add(moreMesh)

//     moreMesh.position.set(center.x, center.y, center.z)
//     const lengthV3 = new Vector3().subVectors(lastLookat, center);

//     // 10是常数,根据不同模型大小或者自己想要的速度自定义
//     const time = lengthV3.length() * 10

//     changeCamera(cameraPosition, lastLookat, center, time)

//     lastLookat.copy(center)

// }
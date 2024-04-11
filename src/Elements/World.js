import { Clock, Mesh, Scene, WebGLRenderer, sRGBEncoding, Raycaster } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// import { Config } from '../Types';

import Camera from './Camera';
import checkDev from '@/utils/checkDev';

import { gsap } from 'gsap';
import createBakeMaterial from '@/materials/createBakeMaterial';
import matcap from '@/materials/matcap';
import Man from './Man';

import Global from '../view/SceneGraph/Global';
import ClockScreen from './ClockScreen';
import backgroundMaterial from '@/materials/backgroundMaterial';

const global = Global.getInstance();

function World(config) {
    this.isDev = checkDev();
    this.isReady = false;
    this.isActive = false;

    this.width = config.width;
    this.height = config.height;

    this.clock = new Clock();

    this.canvas = config.canvas;
    this.renderer = this.createRenderer();
    this.scene = new Scene();
    this.camera = new Camera(this.width, this.height);

    this.controls = this.createControls();

    this.man = null;
    this.clockScreen = null;

    this.raycaster = new Raycaster();
}

World.prototype.createControls = function () {
    const controls = new OrbitControls(this.camera.main, this.canvas);
    controls.target.set(0, 0, 1.4);
    controls.maxAzimuthAngle = Math.PI / 4;
    controls.minAzimuthAngle = -Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = -Math.PI / 4;
    return controls;
};

World.prototype.createRenderer = function () {
    const renderer = new WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(this.width, this.height);
    renderer.setAnimationLoop(this.render.bind(this));
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = sRGBEncoding;
    return renderer;
};

World.prototype.render = function () {
    this.raycaster.setFromCamera(global.mouse.normal, this.camera.main);

    const delta = this.clock.getDelta();

    if (this.man) {
        this.man.animationMixer.update(delta * 0.5);
        const intersects = this.raycaster.intersectObject(this.man.scene.children[0]);
        if (intersects.length > 0) {
            this.man.sayHello();
        }
    }

    if (this.isReady) {
        // !this.isDev && this.camera.update()
    }

    this.controls.update();

    this.renderer.render(this.scene, this.camera.main);
};

World.prototype.build = function (resources) {
    console.log(resources);

    const bgModel = resources['model-bg'].scene.children[0];
    const bgMaterial = backgroundMaterial(resources['texture-bg']);
    bgModel.material = bgMaterial;
    this.scene.add(bgModel);

    const bakeModel = resources['model-bake'].scene.children[0];
    const bakeMaterial = createBakeMaterial(resources['texture-bake']);
    bakeModel.material = bakeMaterial;
    this.scene.add(bakeModel);

    const matcapModels = resources['model-matcap'].scene.children;
    matcapModels.forEach((mesh) => {
        const model = mesh.clone();
        const color = model.name.split('0')[0];
        const matcapName = `matcap-${color}`;
        const material = matcap(resources[matcapName]);
        model.material = material;
        this.scene.add(model);
    });

    this.man = new Man(resources);
    this.scene.add(this.man.scene);

    this.clockScreen = new ClockScreen(resources['model-clock'].scene.children[0]);
    this.scene.add(this.clockScreen.mesh);

    this.isReady = true;
};

World.prototype.refresh = function () {
    this.isActive = false;
    this.camera.ready(() => {
        gsap.to('.actions', { top: 0 });
    });
};

World.prototype.updateSize = function (width, height) {
    this.width = width;
    this.height = height;

    this.camera.updateSize(width, height);
    this.renderer.setSize(width, height);
};

export default World;

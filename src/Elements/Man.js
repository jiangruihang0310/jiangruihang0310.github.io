import skinningMatcap from '@/materials/skinningMatcap';
import { AnimationAction, AnimationClip, AnimationMixer, LoopOnce, SkinnedMesh } from 'three';

class Man {
    constructor(resources) {
        this.resources = resources;
        this.model = resources['model-man'];
        this.scene = resources['model-man'].scene;
        this.animationMixer = new AnimationMixer(this.scene);
        this.actions = this.createActions();
        this.isSayHello = false;
        this.playComputer();
    }

    createActions() {
        const animations = this.model.animations;
        const playComputer = this.animationMixer.clipAction(animations.find((a) => a.name === 'play-computer'));
        const sayHello = this.animationMixer.clipAction(animations.find((a) => a.name === 'say-hello'));
        return {
            sayHello,
            playComputer
        };
    }

    playComputer() {
        this.actions.playComputer.reset();
        this.actions.playComputer.play();
    }

    sayHello() {
        if (this.isSayHello)
            return;
        this.isSayHello = true;
        this.actions.sayHello.reset();
        if (this.actions.playComputer.isRunning()) {
            this.actions.playComputer.fadeOut(0.5);
        }
        this.actions.sayHello.setLoop(LoopOnce, 1);
        this.actions.sayHello.play();
        setTimeout(() => {
            this.actions.playComputer.reset();
            this.isSayHello = false;
        }, 3000);
    }

    setMaterial() {
        const menModels = this.scene.children[0].children;
        menModels.forEach((mesh) => {
            if (mesh instanceof SkinnedMesh) {
                const model = mesh;
                const color = model.name.split('0')[0];
                const matcapName = `matcap-${color}`;
                const material = skinningMatcap(this.resources[matcapName]);
                model.material = material;
            }
        });
    }
}

export default Man;

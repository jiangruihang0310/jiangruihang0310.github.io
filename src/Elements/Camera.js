import gsap from 'gsap';
import { PerspectiveCamera, Vector3 } from 'three';

// Define the relative position of the car
// const cameraPosition = new Vector3(81.8107, -68.4092, 96.8815).normalize()
const viewPosition = {
    default: new Vector3(1, -1, 1).normalize(),
    active: new Vector3(81.8107, -68.4092, 90.8815).normalize()
};

const viewScalar = {
    Loading: 1000,
    Ready: 90,
    Active: 30
};

class Camera {
    constructor(width, height) {
        this.view = {
            position: viewPosition.default.clone(),
            scalar: viewScalar.Loading
        };
        this.target = new Vector3();

        const camera = new PerspectiveCamera(40, width / height, 0.1, 10000);
        // camera.position.copy(this.view.position.clone().multiplyScalar(this.view.scalar))
        camera.up.set(0, 0, 1);
        camera.position.set(0, -8.3, 4.0);
        camera.lookAt(new Vector3(0, 0, 1.4));

        // camera.position.copy(cameraPosition.clone().normalize().multiplyScalar(multiple))
        // camera.lookAt(new Vector3())

        this.main = camera;
    }

    updateSize(width, height) {
        this.main.aspect = width / height;
        this.main.updateProjectionMatrix();
    }

    ready(onComplete) {
        gsap.to(this.view, { scalar: viewScalar.Ready, duration: 2, onComplete });
    }

    active(target, onComplete) {
        gsap.timeline()
            .to(this.target, { x: target.x, y: target.y, z: target.z, duration: 1.5 }, 0)
            .to(this.view, { scalar: viewScalar.Active, onComplete, duration: 1.5 }, 0);
    }

    follow(target) {
        this.target = target;
    }

    update() {
        this.main.position.copy(this.target).add(this.view.position.clone().multiplyScalar(this.view.scalar));
        this.main.lookAt(this.target);
        this.main.updateProjectionMatrix();
    }
}

export default Camera;

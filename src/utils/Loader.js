import { NearestFilter, sRGBEncoding, TextureLoader, VideoTexture } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const LoaderType = {
    Texture: 'Texture',
    GLTF: 'GLTF',
    FBX: 'FBX',
    Video: 'Video',
    PLY: 'PLY'
};

class Loader {
    constructor() {
        this.resources = {};
        this.total = 0;
        this.totalSuccess = 0;
        this.totalFail = 0;

        this.fileLoaded = null;
        this.loadEnd = null;

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('draco/');
        const gltfLoader = new GLTFLoader();
        gltfLoader.setDRACOLoader(dracoLoader);
        this.gltfLoader = gltfLoader;

        this.fbxLoader = new FBXLoader();
        this.textureLoader = new TextureLoader();
        this.plyLoader = new PLYLoader();
    }

    load(resources) {
        this.total += resources.length;

        for (const resource of resources) {
            if (resource.type === LoaderType.Video) {
                this.loadVideo(resource);
            } else {
                this.loadResource(resource);
            }
        }
    }

    onFileLoaded(callback) {
        this.fileLoaded = callback;
    }

    onLoadEnd(callback) {
        this.loadEnd = callback;
    }

    loadVideo(resource) {
        const name = resource.name;
        const path = resource.path;

        try {
            const video = document.createElement('video');
            video.src = path;
            video.muted = true;
            video.playsInline = true;
            video.autoplay = true;
            video.loop = true;
            video.play();

            const videoTexture = new VideoTexture(video);
            videoTexture.magFilter = NearestFilter;
            videoTexture.magFilter = NearestFilter;
            videoTexture.generateMipmaps = false;
            videoTexture.encoding = sRGBEncoding;

            this.resources[name] = videoTexture;

            this.loadSuccess(resource, videoTexture);
        } catch (err) {
            this.loadFail(resource, err);
        }
    }

    loadResource(resource) {
        const type = resource.type;
        if (!type) {
            console.warn('type is required');
            return;
        }

        let loader = this.textureLoader;

        switch (type) {
            case LoaderType.GLTF:
                loader = this.gltfLoader;
                break;
            case LoaderType.FBX:
                loader = this.fbxLoader;
                break;
            case LoaderType.Texture:
                loader = this.textureLoader;
                break;
            case LoaderType.PLY:
                loader = this.plyLoader;
                break;
            default:
                loader = this.textureLoader;
        }

        loader.load(
            resource.path,
            res => { this.loadSuccess(resource, res) },
            undefined,
            res => { this.loadFail(resource, res) }
        );
    }

    loadSuccess(resource, res) {
        this.totalSuccess++;

        const name = resource.name;
        this.resources[name] = res;

        this.fileLoaded && this.fileLoaded(name, res);

        if (this.total === this.totalSuccess + this.totalFail) {
            this.loadEnd && this.loadEnd(this.resources);
        }
    }

    loadFail(resource, res) {
        console.warn(`resource ${resource.name} load fail`, res);
        this.totalFail++;

        if (this.total === this.totalSuccess + this.totalFail) {
            this.loadEnd(this.resources);
        }
    }
}

export default Loader;

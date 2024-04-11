import { MeshBasicMaterial, sRGBEncoding } from 'three';

export default function createBasicMaterial(texture) {
    texture.encoding = sRGBEncoding;
    const material = new MeshBasicMaterial({
        map: texture
    });
    if (material.map) {
        material.map.flipY = false;
    }
    return material;
}


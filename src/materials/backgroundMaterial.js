import vertexShader from '@/shaders/background/vertex.glsl';
import fragmentShader from '@/shaders/background/fragment.glsl';
import { ShaderMaterial, Texture } from 'three';

export default function createBackgroundMaterial(texture) {
    texture.flipY = false;
    return new ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
        uniforms: {
            uTexture: {
                value: texture
            }
        }
    });
}

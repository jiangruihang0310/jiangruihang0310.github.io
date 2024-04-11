import { ShaderMaterial } from 'three';
import vertexShader from '@/shaders/matcap/vertex.glsl'
import fragmentShader from '@/shaders/matcap/fragment.glsl'
export default function createClockScreenMaterial(texture) {
    return new ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            uTexture: {
                value: texture
            }
        }
    });
}

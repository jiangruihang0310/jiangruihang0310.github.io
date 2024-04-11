import { Color, ShaderMaterial } from 'three';
import vertexShader from '@/shaders/ground-shadow/vertex.glsl'
import fragmentShader from '@/shaders/ground-shadow/fragment.glsl'
const colors = {
    brown: '#692c02',
    beige: '#9b5d2b',
    yellow: '#6c530b',
    green: '#424715',
    blue: '#2e4c5b',
};

export default function createGroundShadowMaterial(texture, colorName) {
    const color = new Color(colors[colorName]);

    return new ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
        uniforms: {
            uTexture: {
                value: texture,
            },
            uColor: {
                value: color
            }
        }
    });
}

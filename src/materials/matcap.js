import vertexShader from '@/shaders/matcap/vertex.glsl'
import fragmentShader from '@/shaders/matcap/fragment.glsl'
import { ShaderMaterial } from 'three'

export default function (texture) {
    return new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            uTexture: {
                value: texture
            }
        }
    })
}
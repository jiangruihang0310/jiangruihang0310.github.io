<template>
	<div id="container" ref="container"></div>
</template>

<script>
import { reactive, toRefs, ref, onMounted,nextTick } from 'vue'
import * as THREE from 'three'
export default {
	setup() {
		const dom = ref('')
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(5, 1, 1, 1000);
		const vertexShader = `
						varying vec2 vUv;
						varying vec3 vPos;
						void main(){
						vUv = uv;
						vPos = position;
						gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
						}
					`;
				
		let fragmentShader = `
            uniform float iTime;
            uniform vec2 iMouse;
            varying vec2 vUv;
            
            vec3 mod289(vec3 x) {
                return x - floor(x * (1.0 / 289.0)) * 289.0;
            }
            vec4 mod289(vec4 x) {
                return x - floor(x * (1.0 / 289.0)) * 289.0;
            }
            vec4 permute(vec4 x) {
                return mod289(((x*34.0)+1.0)*x);
            }
            vec4 taylorInvSqrt(vec4 r)
            {
            return 1.79284291400159 - 0.85373472095314 * r;
            }
            float snoise(vec3 v)
            { 
            const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
            const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
           
            vec3 i  = floor(v + dot(v, C.yyy) );
            vec3 x0 =   v - i + dot(i, C.xxx) ;
           
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min( g.xyz, l.zxy );
            vec3 i2 = max( g.xyz, l.zxy );
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
            vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
           
            i = mod289(i); 
            vec4 p = permute( permute( permute( 
                        i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                    + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
            float n_ = 0.142857142857; // 1.0/7.0
            vec3  ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
            vec4 x = x_ *ns.x + ns.yyyy;
            vec4 y = y_ *ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4( x.xy, y.xy );
            vec4 b1 = vec4( x.zw, y.zw );
            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
            vec3 p0 = vec3(a0.xy,h.x);
            vec3 p1 = vec3(a0.zw,h.y);
            vec3 p2 = vec3(a1.xy,h.z);
            vec3 p3 = vec3(a1.zw,h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
            p0 *= norm.x;
            p1 *= norm.y;
            p2 *= norm.z;
            p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                            dot(p2,x2), dot(p3,x3) ) );
            }
            const float STEPS = 4.;
            float CUTOFF = 0.15; //depth less than this, show black
            vec3 hsv2rgb(vec3 c){
                vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
                vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
                return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
            }
            float getNoise(vec2 uv, float t){
                float TRAVEL_SPEED = 1.5;
                
                float SCALE = 2.0;
                float noise = snoise( vec3(uv.x*SCALE ,uv.y*SCALE - t*TRAVEL_SPEED , 0));
                SCALE = 6.0;
                noise += snoise( vec3(uv.x*SCALE + t,uv.y*SCALE , 0))* 0.2 ;
                noise = (noise/2. + 0.5);
                return noise;
            }
            float getDepth(float n){
                float d = (n - CUTOFF) / (1. - CUTOFF); 
                d = floor(d*STEPS)/STEPS;
                return d;
            }
            
            void main() {
                vec2 uv = vUv;
                uv.x *= 4.0;
                float t = iTime * 3.0;    
                vec3 col = vec3(0);
                float noise = getNoise(uv, t);
                CUTOFF = uv.y;    
                CUTOFF += pow(abs(uv.x*0.5 - 1.),1.0);   
                if (noise < CUTOFF){       
                    col = vec3(0.);
                }else{
                    float d = pow(getDepth(noise),0.7);        
                    vec3 hsv = vec3(d *0.17,0.8 - d/4., d + 0.8);
                    col = hsv2rgb(hsv);
                }
                gl_FragColor = vec4(col,col.r); 
            }
            `;
		const material = new THREE.ShaderMaterial({
					uniforms: {
						iTime: { value: 0 },
						iResolution: { value: new THREE.Vector3(1, 1, 1) },
						iMouse: { value: new THREE.Vector2(0.0, 0.0) },
					},
					fragmentShader: fragmentShader,
					vertexShader: vertexShader,
					// side: THREE.DoubleSide,
					transparent: true,
				});
		const renderer = new THREE.WebGLRenderer();
	
		// renderer.setClearColor(0x666666, 1.0);
		onMounted(() => {
			// console.log('....................',dom)
			methods.init()
			methods.animate();
		})
		const methods = {
			init() {
				const doms = document.getElementById('container')
				camera.position.z = 10;
				let pre = 1000;
				let width = doms.clientWidth / pre;
				let height = doms.clientHeight / pre;
				const geometry = new THREE.PlaneGeometry(width, height)
				const mesh = new THREE.Mesh(geometry, material);
				scene.add(mesh);
				doms.appendChild(renderer.domElement);
				window.addEventListener('resize', methods.onWindowResize, false);
				renderer.setSize(doms.clientWidth, doms.clientHeight);
			},
			onWindowResize() {
				const doms = document.getElementById('container')
				camera.aspect = doms.clientWidth / doms.clientHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(doms.clientWidth, doms.clientHeight);
			},
			animate() {
				requestAnimationFrame(methods.animate);
				material && (material.uniforms.iTime.value += 0.01);
				renderer.render(scene, camera);
			}
		}
		return { ...methods, dom }
	}
	}
</script>

<style scoped lang="scss">
#container {
	width: 100%;
	height:100%;
	overflow: hidden;
	canvas{
		width: 100% !important;
		height: 100% !important;
	}
}
</style>
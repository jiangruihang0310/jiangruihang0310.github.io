// import { LoaderType } from '../utils/Loader'
// console.log(LoaderType);
const LoaderType = {
    Texture: 'Texture',
    GLTF: 'GLTF',
    FBX: 'FBX',
    Video: 'Video',
    PLY: 'PLY'
};

export default [
    { name: 'model-bg', type: LoaderType.GLTF, path: '/models/bg.glb'},
    { name: 'texture-bg', type: LoaderType.Texture, path: '/textures/bg.webp'},

    { name: 'model-bake', type: LoaderType.GLTF, path: '/models/bake.glb'},
    { name: 'texture-bake', type: LoaderType.Texture, path: '/textures/bake.webp'},

    { name: 'model-matcap', type: LoaderType.GLTF, path: '/models/matcap.glb'},
    
    { name: 'model-man', type: LoaderType.GLTF, path: '/models/man.glb'},
    { name: 'model-clock', type: LoaderType.GLTF, path: '/models/clock.glb'},

    { name: 'matcap-black', type: LoaderType.Texture, path: '/matcaps/black.webp'},
    { name: 'matcap-blue', type: LoaderType.Texture, path: '/matcaps/blue.webp'},
    { name: 'matcap-brown', type: LoaderType.Texture, path: '/matcaps/brown.webp'},
    { name: 'matcap-cyan', type: LoaderType.Texture, path: '/matcaps/cyan.webp'},
    { name: 'matcap-green', type: LoaderType.Texture, path: '/matcaps/green.webp'},
    { name: 'matcap-pants', type: LoaderType.Texture, path: '/matcaps/pants.webp'},
    { name: 'matcap-red', type: LoaderType.Texture, path: '/matcaps/red.webp'},
    { name: 'matcap-shirt', type: LoaderType.Texture, path: '/matcaps/shirt.webp'},
    { name: 'matcap-shoes', type: LoaderType.Texture, path: '/matcaps/shoes.webp'},
    { name: 'matcap-silver', type: LoaderType.Texture, path: '/matcaps/silver.webp'},
    { name: 'matcap-skin', type: LoaderType.Texture, path: '/matcaps/skin.webp'},
    { name: 'matcap-tie', type: LoaderType.Texture, path: '/matcaps/tie.webp'},
    { name: 'matcap-white', type: LoaderType.Texture, path: '/matcaps/white.webp'},
    { name: 'matcap-yellow', type: LoaderType.Texture, path: '/matcaps/yellow.webp'},

    // { name: 'data-rail-points', type: LoaderType.PLY, path: '/models/rail-points.ply'},
    // { name: 'texture-shadow', type: LoaderType.Texture, path: '/textures/shadows.jpg'},
    // { name: 'model-playground', type: LoaderType.GLTF, path: '/models/playground.glb'},
    // { name: 'model-bricks', type: LoaderType.GLTF, path: '/models/bricks.glb'},
    // { name: 'model-car', type: LoaderType.GLTF, path: '/models/car.glb'},
    // { name: 'model-physics-static', type: LoaderType.GLTF, path: '/models/physics-static.glb'},
    // { name: 'matcap-black', type: LoaderType.Texture, path: '/matcaps/black.png'},
    // { name: 'matcap-blue-light', type: LoaderType.Texture, path: '/matcaps/blue-light.png'},
    // { name: 'matcap-blue-lighter', type: LoaderType.Texture, path: '/matcaps/blue-lighter.png'},
    // { name: 'matcap-blue', type: LoaderType.Texture, path: '/matcaps/blue.png'},
    // { name: 'matcap-brown-dark', type: LoaderType.Texture, path: '/matcaps/brown-dark.png'},
    // { name: 'matcap-brown-light', type: LoaderType.Texture, path: '/matcaps/brown-light.png'},
    // { name: 'matcap-brown-lighter', type: LoaderType.Texture, path: '/matcaps/brown-lighter.png'},
    // { name: 'matcap-brown', type: LoaderType.Texture, path: '/matcaps/brown.png'},
    // { name: 'matcap-eye', type: LoaderType.Texture, path: '/matcaps/eye.png'},
    // { name: 'matcap-green', type: LoaderType.Texture, path: '/matcaps/green.png'},
    // { name: 'matcap-green-light', type: LoaderType.Texture, path: '/matcaps/green-light.png'},
    // { name: 'matcap-pink', type: LoaderType.Texture, path: '/matcaps/pink.png'},
    // { name: 'matcap-purple', type: LoaderType.Texture, path: '/matcaps/purple.png'},
    // { name: 'matcap-purple-dark', type: LoaderType.Texture, path: '/matcaps/purple-dark.png'},
    // { name: 'matcap-purple-light', type: LoaderType.Texture, path: '/matcaps/purple-light.png'},
    // { name: 'matcap-red', type: LoaderType.Texture, path: '/matcaps/red.png'},
    // { name: 'matcap-red-dark', type: LoaderType.Texture, path: '/matcaps/red-dark.png'},
    // { name: 'matcap-red-light', type: LoaderType.Texture, path: '/matcaps/red-light.png'},
    // { name: 'matcap-white', type: LoaderType.Texture, path: '/matcaps/white.png'},
    // { name: 'matcap-yellow', type: LoaderType.Texture, path: '/matcaps/yellow.png'},
    // { name: 'matcap-yellow-dark', type: LoaderType.Texture, path: '/matcaps/yellow-dark.png'},
    // { name: 'matcap-yellow-light', type: LoaderType.Texture, path: '/matcaps/yellow-light.png'},
    // { name: 'matcap-eye', type: LoaderType.Texture, path: '/matcaps/eye.png'},
]
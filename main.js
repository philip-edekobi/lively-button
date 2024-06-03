import * as THREE from "three";
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const shadGroup = new THREE.Group();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
// camera.position.z = 5
camera.position.set(0, 0, 25);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111)

const geometry = new THREE.BoxGeometry(8, 2, 2, 8, 4, 6)

const edgesGeometry = new THREE.EdgesGeometry(geometry)
const material = new THREE.LineDashedMaterial({ color: 0x2377fc, dashSize: 4 })

const edges = new THREE.LineSegments(edgesGeometry, material)
edges.position.y = -4
edges.rotation.x = Math.PI * 0.1
edges.rotation.y = Math.PI * 0.1
edges.castShadow = true
shadGroup.add(edges)

scene.add(shadGroup)
// scene.add(edges)

const textLoader = new FontLoader()
textLoader.load("node_modules/three/examples/fonts/droid/droid_sans_regular.typeface.json", (font) => {
    const textGeometry = new TextGeometry("Turn on TV", {
        font,
        size: 1,
        depth: 0,
    })

    const textMaterial = new THREE.MeshNormalMaterial()
    const text = new THREE.Mesh(textGeometry, textMaterial)
    text.position.x = -3
    text.position.y = -6
    text.position.z = -4
    text.rotation.x = Math.PI * 0.2
    text.rotation.y = Math.PI * 0.1

    scene.add(text)
    renderer.render(scene, camera)
})

const gltfLoader = new GLTFLoader()
gltfLoader.load("./tv/scene.gltf", gltf => {
    gltf.scene.scale.set(15, 12, 15)

    scene.add(gltf.scene)
    renderer.render(scene, camera)
})

const dl = new THREE.DirectionalLight(0xFFFFFF, 0.5);
dl.position.set(0, 2, 4)
dl.castShadow = true;
shadGroup.add(dl)

renderer.render(scene, camera);

// function animate() {
//     edges.rotation.x += 0.01
//     edges.rotation.y += 0.01
//     renderer.render(scene, camera)
// }

// renderer.setAnimationLoop(animate)
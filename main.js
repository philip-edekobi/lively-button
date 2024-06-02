import * as THREE from "three";
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const pointer = new THREE.Vector2()
const raycaster = new THREE.Raycaster()

const onMouseMove = (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    pointer.y = (event.clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(pointer, camera)
}

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
// camera.position.z = 5
camera.position.set(0, 0, 25);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xFFFFFF)

const geometry = new THREE.BoxGeometry(8, 2, 2)

const edgesGeometry = new THREE.EdgesGeometry(geometry)
const material = new THREE.LineDashedMaterial({ color: 0xFF0000, dashSize: 4 })

const edges = new THREE.LineSegments(edgesGeometry, material)
edges.position.y = -4
edges.rotation.x = Math.PI * 0.1
edges.rotation.y = Math.PI * 0.1

scene.add(edges)


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
    // console.log(gltf)

    scene.add(gltf.scene)
    renderer.render(scene, camera)
})



renderer.render(scene, camera);

// function animate() {
//     edges.rotation.x += 0.01
//     edges.rotation.y += 0.01
//     renderer.render(scene, camera)
// }

// renderer.setAnimationLoop(animate)


window.addEventListener("mousemove", onMouseMove)
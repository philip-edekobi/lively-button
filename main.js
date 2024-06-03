import * as THREE from "three";
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';


const video = document.getElementById("vid")

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

const el = document.getElementById("canv")
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: el });
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
// camera.position.z = 5
camera.position.set(0, 0, 25);
camera.lookAt(0, 0, 0);

let width = 0
let height = 0
let intersects = []

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(8, 2, 2)

const edgesGeometry = new THREE.EdgesGeometry(geometry)
const material = new THREE.LineDashedMaterial({ color: 0x2377fc, dashSize: 4 })

const edges = new THREE.LineSegments(edgesGeometry, material)
edges.position.y = 8.5
// edges.rotation.x = Math.PI * 0.1
// edges.rotation.y = Math.PI * 0.1

scene.add(edges)

let txt

const textLoader = new FontLoader()
textLoader.load("node_modules/three/examples/fonts/droid/droid_sans_regular.typeface.json", (font) => {
    const textGeometry = new TextGeometry("Play Video", {
        font,
        size: 1,
        depth: 0,
    })

    const textMaterial = new THREE.MeshNormalMaterial()
    const text = new THREE.Mesh(textGeometry, textMaterial)
    text.position.x = -3
    text.position.y = 9
    text.position.z = -4
    // text.rotation.x = Math.PI * 0.2
    // text.rotation.y = Math.PI * 0.1

    txt = text
    scene.add(text)
    renderer.render(scene, camera)
})

renderer.render(scene, camera);

function animate() {
    edges.rotation.x += 0.01
    // edges.rotation.y += 0.01

    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)

// events
function resize() {
    width = window.innerWidth
    height = window.innerHeight
    camera.aspect = width / height
    const target = new THREE.Vector3(0, 0, 0)
    const distance = camera.position.distanceTo(target)
    const fov = (camera.fov * Math.PI) / 180
    const viewportHeight = 2 * Math.tan(fov / 2) * distance
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
}

window.addEventListener('resize', resize)
resize()


window.addEventListener('mousemove', (e) => {
    mouse.set((e.clientX / width) * 2 - 1, -(e.clientY / height) * 2 + 1)
    raycaster.setFromCamera(mouse, camera)
    intersects = raycaster.intersectObjects(scene.children)
    const findCube = intersects.find((hit) => hit.object === edges)
    if (findCube) { document.body.style.cursor = "pointer" } else {
        document.body.style.cursor = "default"
    }
    edges.material.color.convertSRGBToLinear()
})

window.addEventListener("click", e => {
    const findCube = intersects.find((hit) => hit.object === edges || hit.object === txt)
    console.log(intersects)
    console.log(findCube);

    if (findCube) {
        video.play()
    }
})
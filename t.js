import * as THREE from "three"

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth,
    0.1,
    20000
)
camera.position.set(10, 3, 36)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

const loader = new THREE.CubeTextureLoader();
let materialArray = [];

let texture_ft = new THREE.TextureLoader().load("./rick.jpeg")
let texture_up = new THREE.TextureLoader().load("./rick.jpeg")
let texture_bk = new THREE.TextureLoader().load("./rick.jpeg")
let texture_dn = new THREE.TextureLoader().load("./rick.jpeg")
let texture_rt = new THREE.TextureLoader().load("./rick.jpeg")
let texture_lt = new THREE.TextureLoader().load("./rick.jpeg")

materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }))
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }))
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }))
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }))
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }))
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lt }))

let video = document.getElementById("vid")

let videoTexture = new THREE.VideoTexture(video)
videoTexture.minFilter = THREE.LinearFilter
videoTexture.magFilter = THREE.LinearFilter

var movieMaterial = new THREE.MeshBasicMaterial({
    map: videoTexture,
    side: THREE.FrontSide,
    toneMapped: false,
})

let movieGeometry = new THREE.BoxGeometry(100, 100, 100)

let movieCubeScreen = new THREE.Mesh(movieGeometry, movieMaterial)

movieCubeScreen.position.set(0, 50, 0)
scene.add(movieCubeScreen)

camera.position.set(0, 150, 300)
camera.lookAt(movieCubeScreen.position)

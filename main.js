import './style.css';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Background from './assets/snow.jpg';
// import Penguin from './assets/penguin/scene.gltf';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// camera.position.setZ(30);
// camera.position.setX(0);

renderer.render(scene, camera);

// Background

const backgroundTexture = new THREE.TextureLoader().load(Background);
scene.background = backgroundTexture;

// Penguin

const gltfLoader = new GLTFLoader();

gltfLoader.load( './assets/penguin/scene.gltf', (gltfScene) => {
	scene.add( gltfScene.scene );
  gltfScene.scene.scale.set(2,2,2);
  gltfScene.scene.position.y = -1.9;

});

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

/// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  // controls.update();

  renderer.render(scene, camera);
}

animate();
import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

const RADIUS = 0.5;
const WIDTH_SEGMENTS = 64;
const HEIGHT_SEGMENTS = 64;

const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('/textures/NormalMap.png');

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereBufferGeometry(
  RADIUS,
  WIDTH_SEGMENTS,
  HEIGHT_SEGMENTS
);

// Materials
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.normalMap = normalTexture;
material.color = new THREE.Color(0x292929);

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

const pointLight1 = new THREE.PointLight(0xff0000, 2);
pointLight1.position.x = -1.86;
pointLight1.position.y = 1;
pointLight1.position.z = -1.65;
pointLight1.intensity = 10;
scene.add(pointLight1);

const light1 = gui.addFolder('Light 1');

light1.add(pointLight1.position, 'y').min(-3).max(3).step(0.01);
light1.add(pointLight1.position, 'x').min(-6).max(6).step(0.01);
light1.add(pointLight1.position, 'z').min(-3).max(3).step(0.01);
light1.add(pointLight1, 'intensity').min(0).max(10).step(0.01);

const pointLightHelper1 = new THREE.PointLightHelper(pointLight1, 1);
scene.add(pointLightHelper1);

const pointLight2 = new THREE.PointLight(0xc0a9, 2);
pointLight2.position.x = 2.13;
pointLight2.position.y = -2.71;
pointLight2.position.z = -3;
pointLight2.intensity = 6.8;
scene.add(pointLight2);

const light2 = gui.addFolder('Light 2');

light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.01);
light2.add(pointLight2.position, 'x').min(-6).max(6).step(0.01);
light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.01);
light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01);

const light2Color = { color: 0xff0000 };
light2.addColor(light2Color, 'color').onChange(() => {
  pointLight2.color.set(light2Color.color);
});

const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1);
scene.add(pointLightHelper2);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true, //makes background transparent
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

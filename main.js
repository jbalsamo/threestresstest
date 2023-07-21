import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./style.css";

console.time("test start");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("canvas-container").appendChild(renderer.domElement);

// Generate and add 100 random polygons to the scene
for (let i = 0; i < 100; i++) {
  const numVertices = Math.floor(Math.random() * 10) + 5; // Random number of vertices between 3 and 7

  // Generate random vertices for the polygon
  const vertices = [];
  for (let j = 0; j < numVertices; j++) {
    const maxOffset = 0.5;
    const offsetX = Math.random() * maxOffset * 2 - maxOffset;
    const offsetY = Math.random() * maxOffset * 2 - maxOffset;
    vertices.push(new THREE.Vector2(offsetX, offsetY));
  }

  // Create a shape with the vertices
  const shape = new THREE.Shape(vertices);

  // Create a geometry from the shape
  const geometry = new THREE.ShapeGeometry(shape);

  const color = new THREE.Color(Math.random(), Math.random(), Math.random()); // Random RGB color
  const material = new THREE.MeshBasicMaterial({ color });
  const polygon = new THREE.Mesh(geometry, material);
  scene.add(polygon);
}

// Set up controls for moving the view
const controls = new OrbitControls(camera, renderer.domElement);

// Set up event listeners for keyboard and mouse controls
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("wheel", handleMouseWheel);

// Initial camera position
camera.position.z = 5;

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
console.timeEnd("test start");

// Event handlers for keyboard and mouse controls
function handleKeyDown(event) {
  const moveDistance = 0.1;
  console.log(event.key);

  switch (event.key) {
    case "ArrowUp":
      camera.position.y += moveDistance;
      break;
    case "ArrowDown":
      camera.position.y -= moveDistance;
      break;
    case "ArrowLeft":
      camera.position.x -= moveDistance;
      break;
    case "ArrowRight":
      camera.position.x += moveDistance;
      break;
  }
}

function handleMouseMove(event) {
  const moveDistance = 0.01;
  const rotationAngle = Math.PI / 180;

  if (event.buttons === 1) {
    camera.position.x -= event.movementX * moveDistance;
    camera.position.y += event.movementY * moveDistance;
  }

  if (event.buttons === 2) {
    camera.rotation.y -= event.movementX * rotationAngle;
    camera.rotation.x -= event.movementY * rotationAngle;
  }
}

function handleMouseWheel(event) {
  const zoomFactor = 0.1;

  if (event.deltaY < 0) {
    camera.position.z -= zoomFactor;
  } else {
    camera.position.z += zoomFactor;
  }
}

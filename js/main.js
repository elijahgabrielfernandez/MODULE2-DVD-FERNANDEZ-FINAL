// Create the scene
const scene = new THREE.Scene();

scene.background = new THREE.Color(0x000000);


// Create the camera
const camera = new THREE.OrthographicCamera(
  -400,
  400,
  400,
  -400,
  0.1,
  1000
);

camera.position.z = 10;


// Create the renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(800, 800);

document
  .getElementById("scene-container")
  .appendChild(renderer.domElement);


// Create the DVD using PlaneGeometry
const dvdGeometry = new THREE.PlaneGeometry(
  420,
  180
);


// Create a canvas for the DVD logo
const logoCanvas = document.createElement("canvas");

logoCanvas.width = 720;
logoCanvas.height = 300;

const logoContext = logoCanvas.getContext("2d");


// Transparent background
logoContext.clearRect(
  0,
  0,
  logoCanvas.width,
  logoCanvas.height
);


// Draw DVD text
logoContext.fillStyle = "white";

logoContext.textAlign = "center";
logoContext.textBaseline = "middle";

logoContext.font = "bold italic 190px Arial";

logoContext.fillText(
  "DVD",
  360,
  105
);


// Draw VIDEO text
logoContext.font = "bold 45px Arial";

logoContext.fillText(
  "VIDEO",
  360,
  205
);


// Draw oval underneath
logoContext.strokeStyle = "white";
logoContext.lineWidth = 12;

logoContext.beginPath();

logoContext.ellipse(
  360,
  250,
  150,
  22,
  0,
  0,
  Math.PI * 2
);

logoContext.stroke();


// Convert canvas into a Three.js texture
const dvdTexture = new THREE.CanvasTexture(
  logoCanvas
);


// Create DVD material
const dvdMaterial = new THREE.MeshBasicMaterial({
  map: dvdTexture,
  color: 0x0066ff,
  transparent: true
});


// Create DVD mesh
const dvd = new THREE.Mesh(
  dvdGeometry,
  dvdMaterial
);


// Start at origin (0, 0, 0)
dvd.position.set(
  0,
  0,
  0
);

scene.add(dvd);


// Movement speed
let speedX = 3;
let speedY = 2.5;


// Number of bounces
let bounceCount = 0;


// Change color every bounce
function changeColor() {

  dvd.material.color.setHex(
    Math.random() * 0xffffff
  );

}


// Make DVD smaller every bounce
function shrinkDVD() {

  dvd.scale.multiplyScalar(0.65);

}


// Animation
function animate() {

  requestAnimationFrame(animate);


  // Move DVD
  dvd.position.x += speedX;
  dvd.position.y += speedY;


  // Half of the 360 x 150 DVD size
  const halfWidth = 210 * dvd.scale.x;
  const halfHeight = 90 * dvd.scale.y;


  // Left and right bounds
  if (
    dvd.position.x + halfWidth >= 400 ||
    dvd.position.x - halfWidth <= -400
  ) {

    speedX = -speedX;

    changeColor();

    shrinkDVD();

    bounceCount++;

  }


  // Top and bottom bounds
  if (
    dvd.position.y + halfHeight >= 400 ||
    dvd.position.y - halfHeight <= -400
  ) {

    speedY = -speedY;

    changeColor();

    shrinkDVD();

    bounceCount++;

  }


  // Disappear after 7 bounces
  if (bounceCount >= 7) {

    dvd.visible = false;

  }


  renderer.render(
    scene,
    camera
  );

}


animate();
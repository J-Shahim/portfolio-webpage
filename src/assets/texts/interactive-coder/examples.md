# Code Editor Portal Example Usage

## JavaScript Examples

### 1. Text Output

```javascript
// Output plain text
outputDiv.innerHTML = "<pre>Hello, world!\nThis is plain text output.</pre>";
```

---

### 2. HTML Output

```javascript
// Output HTML
outputDiv.innerHTML = "<h2 style='color:#5f1d7a;'>HTML Output</h2><p>This is a <b>bold</b> paragraph.</p>";
```

---

### 3. SVG Output

```javascript
// Output SVG graphic
outputDiv.innerHTML = `<svg width="120" height="120">
  <rect x="10" y="10" width="100" height="100" fill="#0077ff" stroke="#5f1d7a" stroke-width="4"/>
  <circle cx="60" cy="60" r="30" fill="#fff" stroke="#266da7" stroke-width="4"/>
</svg>`;
```

---

### 4. Canvas Output

```javascript
// Draw on a blue canvas and show an 'X' for the cursor, drawing a white line when mouse is held and moved
const canvas = document.createElement("canvas");
canvas.width = 400;
canvas.height = 300;
outputDiv.innerHTML = ""; // Clear previous output
outputDiv.appendChild(canvas);
const ctx = canvas.getContext("2d");

// Fill canvas background with blue
ctx.fillStyle = "#0077ff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let drawing = false;
let mouseOverCanvas = false;
let mouseX = 0;
let mouseY = 0;
let lines = [];
let currentLine = null;

// Draw an 'X' at the current mouse position
function drawBrush(x, y) {
  ctx.save();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - 8, y - 8);
  ctx.lineTo(x + 8, y + 8);
  ctx.moveTo(x + 8, y - 8);
  ctx.lineTo(x - 8, y + 8);
  ctx.stroke();
  ctx.restore();
}

// Redraw all lines and brush indicator
function redraw() {
  ctx.fillStyle = "#0077ff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  for (const line of lines) {
    ctx.beginPath();
    ctx.moveTo(line[0].x, line[0].y);
    for (let i = 1; i < line.length; i++) {
      ctx.lineTo(line[i].x, line[i].y);
    }
    ctx.stroke();
  }
  if (drawing && currentLine && currentLine.length > 1) {
    ctx.beginPath();
    ctx.moveTo(currentLine[0].x, currentLine[0].y);
    for (let i = 1; i < currentLine.length; i++) {
      ctx.lineTo(currentLine[i].x, currentLine[i].y);
    }
    ctx.stroke();
  }
  if (mouseOverCanvas) {
    drawBrush(mouseX, mouseY);
  }
}

canvas.addEventListener("mouseenter", () => { mouseOverCanvas = true; redraw(); });
canvas.addEventListener("mouseleave", () => {
  mouseOverCanvas = false;
  drawing = false;
  currentLine = null;
  redraw();
});
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
  currentLine = [{ x: mouseX, y: mouseY }];
  redraw();
});
canvas.addEventListener("mouseup", () => {
  drawing = false;
  if (currentLine && currentLine.length > 1) {
    lines.push(currentLine);
  }
  currentLine = null;
  redraw();
});
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
  if (drawing && currentLine) {
    currentLine.push({ x: mouseX, y: mouseY });
  }
  redraw();
});
```

---

### 5. 3D/WebGL Output (Three.js)

```javascript
// Render a rotating cube using Three.js
outputDiv.innerHTML = ""; // Clear previous output
const renderer = new THREE.WebGLRenderer();
renderer.setSize(300, 300);
outputDiv.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x0077ff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
```

---

### 6. Plotly Chart Output

```javascript
// Render a Plotly chart
outputDiv.innerHTML = ""; // Clear previous output
Plotly.newPlot(outputDiv, [
  { x: [1, 2, 3, 4], y: [10, 15, 13, 17], type: 'scatter', mode: 'lines+markers', marker: { color: '#5f1d7a' } },
  { x: [1, 2, 3, 4], y: [16, 5, 11, 9], type: 'bar', marker: { color: '#0077ff' } }
], { title: "Demo Plotly Chart", paper_bgcolor: "#f3eaff" });
```

---

## Python Examples

### 1. Text Output

```python
print("Hello, world!")
print("This is plain text output from Python.")
```

---

### 2. Matplotlib SVG Plot

```python
import matplotlib.pyplot as plt

plt.figure(figsize=(4, 4))
plt.plot([0, 1, 2, 3], [0, 1, 4, 9], marker='o', color='#5f1d7a')
plt.title("SVG Line Plot Example")
plt.xlabel("X Axis")
plt.ylabel("Y Axis")
plt.grid(True)
```

---

### 3. Matplotlib Bar Chart

```python
import matplotlib.pyplot as plt

plt.figure(figsize=(4, 3))
plt.bar(['A', 'B', 'C'], [5, 7, 3], color='#0077ff')
plt.title("SVG Bar Chart Example")
```

---

### 4. Matplotlib Scatter Plot

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 30)
y = np.sin(x)

plt.figure(figsize=(5, 3))
plt.scatter(x, y, color='#266da7')
plt.title("SVG Scatter Plot Example")
```

---

### 5. Matplotlib 3D Plot

```python
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import numpy as np

fig = plt.figure(figsize=(5, 4))
ax = fig.add_subplot(111, projection='3d')
X = np.linspace(-5, 5, 50)
Y = np.linspace(-5, 5, 50)
X, Y = np.meshgrid(X, Y)
Z = np.sin(np.sqrt(X**2 + Y**2))
ax.plot_surface(X, Y, Z, cmap='viridis')
ax.set_title("SVG 3D Surface Plot Example")
```

---

### 6. No Output Example

```python
# This code produces no output
a = 5
b = 7
c =
```

---

### 7. Click and Drag to Draw on Canvas

```javascript
// Show an 'X' for the cursor and draw a white line when mouse is held and moved
// Create a canvas that fills the output field
const container = outputDiv; // outputDiv is your plotRef.current
container.innerHTML = ""; // Clear previous output

// Get container size
const width = container.offsetWidth || 400;
const height = container.offsetHeight || 300;

const canvas = document.createElement("canvas");
canvas.width = width;
canvas.height = height;
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.display = "block";
container.appendChild(canvas);

const ctx = canvas.getContext("2d");

// Fill canvas background with blue
ctx.fillStyle = "#0077ff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// ...rest of your drawing code...

let drawing = false;
let mouseOverCanvas = false;
let mouseX = 0;
let mouseY = 0;

// Store drawn lines so we can redraw them when needed
let lines = [];

// Draw an 'X' at the current mouse position
function drawBrush(x, y) {
  ctx.save();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - 8, y - 8);
  ctx.lineTo(x + 8, y + 8);
  ctx.moveTo(x + 8, y - 8);
  ctx.lineTo(x - 8, y + 8);
  ctx.stroke();
  ctx.restore();
}

// Redraw all lines
function redrawLines() {
  ctx.fillStyle = "#0077ff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  for (const line of lines) {
    ctx.beginPath();
    ctx.moveTo(line[0].x, line[0].y);
    for (let i = 1; i < line.length; i++) {
      ctx.lineTo(line[i].x, line[i].y);
    }
    ctx.stroke();
  }
}

// Track current line being drawn
let currentLine = null;

canvas.addEventListener("mouseenter", () => { mouseOverCanvas = true; });
canvas.addEventListener("mouseleave", () => {
  mouseOverCanvas = false;
  drawing = false;
  currentLine = null;
  redrawLines();
});
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
  currentLine = [{ x: mouseX, y: mouseY }];
});
canvas.addEventListener("mouseup", () => {
  drawing = false;
  if (currentLine && currentLine.length > 1) {
    lines.push(currentLine);
  }
  currentLine = null;
  redrawLines();
});
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
  if (drawing && currentLine) {
    currentLine.push({ x: mouseX, y: mouseY });
  }
  redrawLines();
  // Draw current line in progress
  if (drawing && currentLine && currentLine.length > 1) {
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(currentLine[0].x, currentLine[0].y);
    for (let i = 1; i < currentLine.length; i++) {
      ctx.lineTo(currentLine[i].x, currentLine[i].y);
    }
    ctx.stroke();
  }
  // Draw brush indicator
  if (mouseOverCanvas) {
    drawBrush(mouseX, mouseY);
  }
});
```
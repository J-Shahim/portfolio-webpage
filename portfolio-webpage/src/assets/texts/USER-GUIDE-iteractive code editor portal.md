# User Guide: Interactive Code Portal

Welcome to the Interactive Code Portal!  
This web portal allows you to write, run, and visualize code directly in your browser using a powerful Monaco-based editor.

---

## ✨ Features

- **Live Code Editing:** Write and edit JavaScript code in a modern code editor (Monaco, the same as VS Code).
- **Run Code Instantly:** Click the "Run Code" button to execute your code and see results immediately.
- **Output Panel:** View the result of your code execution in a dedicated output area.
- **Console Panel:** See all `console.log` outputs and errors in a console panel.
- **3D Graphics with three.js:** Render interactive 3D scenes and objects using the three.js library.
- **2D & 3D Plotting with Plotly.js:** Create beautiful 2D and 3D plots and charts using Plotly.js.
- **Side-by-Side Visualization:** Output and 3D/plot panels are displayed side by side for easy comparison.

---

## 🛠️ How to Use

1. **Write Your Code:**  
   - Use the editor to write JavaScript code.
   - Both `Plotly` (for plotting) and `THREE` (for 3D graphics) are available globally.
   - Use the provided `outputDiv` as your output container for visualizations.

2. **Run Your Code:**  
   - Click the **"Run Code"** button below the editor.
   - The output and any console logs will appear in their respective panels.

3. **View Visualizations:**  
   - For 3D graphics, use three.js and attach your renderer to `outputDiv`.
   - For 2D/3D plots, use Plotly.js and render to `outputDiv`.

---

## 📊 Example: 2D Sinusoidal Plot (Plotly.js)

```javascript
const x = [];
const y = [];
for (let i = 0; i <= 100; i++) {
  const xi = i * 0.1;
  x.push(xi);
  y.push(Math.sin(xi));
}
const trace = { x, y, mode: 'lines', name: 'sin(x)' };
Plotly.newPlot(outputDiv, [trace], { title: '2D Sinusoidal Plot' });
```

---

## 🧊 Example: 3D Cube (three.js)

```javascript
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(400, 300);
outputDiv.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
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

## 🧑‍💻 Tips

- Use `console.log()` to print messages to the console panel.
- You can clear the output by running new code.
- Both Plotly and three.js are available via CDN—no need to import them in your code.

---

## 📚 Supported Libraries

- [three.js](https://threejs.org/) (MIT License)
- [Plotly.js](https://plotly.com/javascript/) (MIT License)

---

Enjoy exploring code and visualizations in your browser!
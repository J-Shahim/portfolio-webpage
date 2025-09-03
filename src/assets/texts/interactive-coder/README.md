# Interactive Code Editor Portal

The Interactive Code Editor Portal is a web-based environment designed to help users practice, experiment, and visualize code in real time. It is ideal for students, hobbyists, and professionals seeking a lightweight, browser-based coding experience.

---

## Overview

This page allows you to write, edit, and execute code directly in your browser. You can switch between JavaScript and Python, load example problems, and see instant feedback from your code. For JavaScript, you can also visualize 2D/3D graphics and plots using integrated libraries.

---

## Features

### 1. **Language Selection**
- Choose between JavaScript and Python using the dropdown menu.
- The editor adapts to your selected language, providing syntax highlighting and appropriate execution.

### 2. **Example Picker**
- Browse and load curated example problems for both languages.
- Examples range from basic syntax demonstrations to algorithmic challenges.

### 3. **Live Editor**
- Edit code in a responsive Monaco-based editor (the same editor as VS Code).
- Run your code and view output instantly below the editor.
- Errors and exceptions are displayed to help you debug.

### 4. **Code Execution**
- JavaScript code is executed in the browser using `eval`.
- Python code is run using a browser-based interpreter (such as Pyodide).

### 5. **Visualization Support**
- **3D Graphics with three.js:** Render interactive 3D scenes and objects.
- **2D & 3D Plotting with Plotly.js:** Create beautiful 2D and 3D plots and charts.
- **Side-by-Side Visualization:** Output and visualization panels are displayed side by side for easy comparison.

### 6. **Output & Console Panels**
- View the result of your code execution in a dedicated output area.
- See all `console.log` outputs and errors in a console panel.

### 7. **User Interface**
- Clean, modern design with collapsible header for distraction-free coding.
- Responsive layout for desktop and tablet use.

---

## How to Use

1. **Write Your Code:**  
   - Use the editor to write JavaScript or Python code.
   - For JavaScript, both `Plotly` (for plotting) and `THREE` (for 3D graphics) are available globally.
   - Use the provided `outputDiv` as your output container for visualizations.

2. **Run Your Code:**  
   - Click the **"Run Code"** button below the editor.
   - The output and any console logs will appear in their respective panels.

3. **View Visualizations:**  
   - For 3D graphics, use three.js and attach your renderer to `outputDiv`.
   - For 2D/3D plots, use Plotly.js and render to `outputDiv`.

---

## Examples

### 📊 2D Sinusoidal Plot (Plotly.js)

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

### 🧊 3D Cube (three.js)

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

## Usage Tips

- Use `console.log()` to print messages to the console panel.
- You can clear the output by running new code.
- Both Plotly and three.js are available via CDN—no need to import them in your code.
- Use the example picker to get started quickly and learn new concepts.
- Experiment with small code snippets to understand language features.
- Copy your code to a local editor or IDE for more complex projects.

---

## Limitations

- **Language Support:** Only JavaScript and Python are supported. Other languages are not available.
- **External Libraries:** You cannot import or use external libraries/packages (e.g., NumPy, React, Lodash).
- **Security:** Code execution is sandboxed, but malicious code may still cause browser instability.
- **Performance:** Large or complex code may run slowly or fail to execute.
- **Debugging:** No advanced debugging tools (breakpoints, step-through, variable inspection).
- **Persistence:** Code and output are not saved between sessions. Refreshing the page will reset your work.
- **Mobile Experience:** Editor may not be fully optimized for mobile devices.

---

## Supported Libraries

- [three.js](https://threejs.org/) (MIT License)
- [Plotly.js](https://plotly.com/javascript/) (MIT License)

---

## Contact & Feedback

If you have suggestions, encounter bugs, or want to request features, please contact the site maintainer or open an issue on the project’s GitHub page.
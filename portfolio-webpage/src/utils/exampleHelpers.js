export const exampleCodes = {
  javascript: `// Example: 2D Sinusoidal Plot with Plotly.js
const x = [];
const y = [];
for (let i = 0; i <= 100; i++) {
  const xi = i * 0.1;
  x.push(xi);
  y.push(Math.sin(xi));
}
const trace = { x, y, mode: 'lines', name: 'sin(x)' };
Plotly.newPlot(outputDiv, [trace], { title: '2D Sinusoidal Plot' });`,

  python: `# Example: 2D Sinusoidal Plot in Python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 2 * np.pi, 100)
y = np.sin(x)
plt.plot(x, y)
plt.title("2D Sinusoidal Plot")`
};

// --- Improved Helper: Parse examples from exampls.md ---
export function getExamplesByLanguage(markdown, language) {
  const exampleRegex = /###\s*(.*?)\s*\r?\n+```(\w+)\r?\n([\s\S]*?)```/g;
  const matches = [...markdown.matchAll(exampleRegex)];
  const examples = matches
    .filter(match => match[2].toLowerCase() === language)
    .map(match => ({
      title: match[1].trim(),
      code: match[3].trim()
    }));
  return examples;
}
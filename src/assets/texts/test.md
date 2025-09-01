# Test Markdown Document

Welcome! This file is for testing Markdown rendering across your site.

## Headings
# H1
## H2
### H3
#### H4

## Emphasis
This is **bold**, *italic*, and ***bold italic***. Here is ~~strikethrough~~.

## Inline
Inline code: `np.linspace(0, 1, 100)` and a link: [OpenAI](https://openai.com).

## Lists
- Bullet item A
- Bullet item B
  - Nested item B1
  - Nested item B2

1. Numbered item 1
2. Numbered item 2
   1. Nested 2.1
   2. Nested 2.2

- [x] Completed task
- [ ] Incomplete task

## Blockquote
> Good engineering is simple, but not simpler.

## Code Blocks
```python
import numpy as np
x = np.linspace(0, 2*np.pi, 256)
y = np.sin(x)
print(y[:5])
```

```bash
echo "Hello, world!"
```

## Table
| Parameter | Value | Units |
|----------:|:-----:|:-----:|
| Mach      | 2.6   | –     |
| Pressure  | 50    | kPa   |
| Temp      | 300   | K     |



## Horizontal Rule
---

## Footnote
Here is a statement with a footnote.[^1]

[^1]: This is the footnote content.

## Callouts (Common style)
> **Note:** This is a note callout example.

> **Warning:** This is a warning callout example.

## Math (if supported)
Inline math: \( a^2 + b^2 = c^2 \)

Block math:
$$
\dot{m} = \rho A V
$$

## Escapes / Special Characters
Render literals: \*not italic\*, \_not italic\_, \# not a heading

---

_Last updated: 2025-08-12_

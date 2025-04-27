# bedazzle ✨

Bedazzle your objects with progressive decorators!

```js
import { bedazzle } from './bedazzle.js';

// Define some decorators to add to the object
const withGlitter = obj => ({
  sparkle: () => console.log('✨ Sparkle with glitter! ', obj),
});

const withArea = ({ width, height }) => ({
  getArea: () => width * height,
});

const withPerimeter = ({ width, height }) => ({
  getPerimeter: () => 2 * (width + height),
});

const withDiagonalLength = ({ width, height }) => ({
  getDiagonalLength: () => Math.sqrt(width ** 2 + height ** 2),
});

// Combine them all using bedazzle
const magicObject = bedazzle(
  { width: 5, height: 10, type: 'rectangle' },
  withGlitter,
  withArea,
  withPerimeter,
  withDiagonalLength
);

// Call the methods added by decorators
magicObject.sparkle();           // ✨ Sparkle with glitter!  { width: 5, height: 10, type: 'rectangle' }
console.log(magicObject.getArea());           // 50
console.log(magicObject.getPerimeter());     // 30
console.log(magicObject.getDiagonalLength()); // 11.180339887498949
```

🍃 Lightweight (~300 bytes)

🧠 Functional and composable

🎨 Designed for dynamic object enhancement

# bedazzle

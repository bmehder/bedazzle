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

## Description
In spirit, bedazzlejs is:
- Part decorator
- Part reducer
- Part pipeline
- Part recursive composer

Closest concepts:
- pipe (but merging objects at each step)
- mergeAll (but with functions producing partial objects)

How it works:
- Each step is a function that receives the current state and a next function it can call recursively.
- Each function returns partial props (methods or fields) to be merged into the object.
- It builds an object gradually, but lets each step "opt-in" to deeper decoration.

Why it's unique and interesting:
- It's a dynamic object builder based on decorator functions.
- It’s middleware-ish but for object capabilities, not event handling.
- It’s recursive and flexible, which most simple "pipeline" libraries aren’t.

If it were a pattern name...Something like:
- "Decorator Cascade"
- "Progressive Decorator"
- "Merging Pipe"
- "Recursive Composer"
- "Middleware Object Builder"

Bottom line:
- Not quite classic facade, not quite classic pipeline — it's a hybrid.

🍃 Lightweight (~300 bytes)

🧠 Functional and composable

🎨 Designed for dynamic object enhancement

# bedazzle

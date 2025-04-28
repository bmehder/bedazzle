# From Factory Functions to BedazzleJS: A Case for Functional Decorators

When you need to create objects with methods and properties in JavaScript, the usual options are:

- **Class-based inheritance**
- **Factory functions**
- **Mixins or composition functions**

Each of these approaches works—but they often come with tradeoffs like rigidity, boilerplate, or complexity.

In this article, we'll walk through how you might traditionally solve these problems with factories or classes, and then show how **BedazzleJS** offers a simpler, more flexible alternative through **functional decorators**.

---

## Traditional Approach #1: Classes

```js
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }

  getPerimeter() {
    return 2 * (this.width + this.height);
  }
}

const rect = new Rectangle(5, 10);
console.log(rect.getArea()); // 50
```

✅ **Pros:** Familiar pattern, clear structure.  
⚠️ **Cons:** Inheritance trees get messy as behavior grows or changes.

---

## Traditional Approach #2: Factory Functions

```js
const createRectangle = (width, height) => {
  return {
    width,
    height,
    getArea: () => width * height,
    getPerimeter: () => 2 * (width + height),
  };
};

const rect = createRectangle(5, 10);
console.log(rect.getArea()); // 50
```

✅ **Pros:** No inheritance needed, simple.  
⚠️ **Cons:** All functionality bundled together—harder to compose or extend without repeating code.

---

## The Problem with Both Approaches

Both classes and factory functions force you to **predefine all features up front**.

What happens if later on you want to add:
- A `getDiagonalLength()` method?
- Logging?
- A plugin system?

With factories or classes, your options are:
- Modify the original function/class (risk breaking things).
- Duplicate code elsewhere.
- Reach for mixins (which can get messy fast).

Is there a better way?

---

## The BedazzleJS Approach: Composable, Functional Decorators

With BedazzleJS, you **compose behaviors one step at a time** using small decorator functions.

```js
import { bedazzle } from 'bedazzlejs';

const withArea = ({ width, height }) => ({
  getArea: () => width * height,
});

const withPerimeter = ({ width, height }) => ({
  getPerimeter: () => 2 * (width + height),
});

const withDiagonalLength = ({ width, height }) => ({
  getDiagonalLength: () => Math.sqrt(width ** 2 + height ** 2),
});

const rectangle = bedazzle(
  { width: 5, height: 10 },
  withArea,
  withPerimeter,
  withDiagonalLength
);

console.log(rectangle.getArea());           // 50
console.log(rectangle.getPerimeter());      // 30
console.log(rectangle.getDiagonalLength()); // 11.18
```

---

## Why This Pattern Works Better

| Approach          | Flexible Composition | Easy to Extend | Plain Objects | No Boilerplate |
|------------------|----------------------|----------------|---------------|---------------|
| Classes           | ❌                  | ⚠️ sometimes | ❌           | ❌           |
| Factory Functions | ⚠️ possible       | ⚠️ awkward   | ✅           | ⚠️ tied to factory |
| **BedazzleJS**    | ✅ natural            | ✅ easy           | ✅ yes       | ✅ minimal     |

BedazzleJS makes it easy to add, remove, or rearrange behavior **at any time**, without touching your original object setup.

---

## Adding New Features Is Simple

Need to add logging later?

```js
const withLogger = obj => ({
  log: () => console.log(JSON.stringify(obj, null, 2)),
});

const loggedRectangle = bedazzle(
  { width: 5, height: 10 },
  withArea,
  withPerimeter,
  withLogger
);

loggedRectangle.log();
```

No changes to your existing decorators. No rewrites. Just **add the decorator**.

---

## When to Choose BedazzleJS Over Classes or Factories

- When you want **modular, testable behaviors**.
- When you prefer **composition over inheritance**.
- When your objects need to **evolve over time** (add features dynamically).
- When you want to avoid **boilerplate-heavy class or factory code**.

If your needs are simple and static, factories or classes may be fine. But if you want flexibility, modularity, and composability, BedazzleJS is a great fit.

---

## Try It Out

```bash
npm install bedazzlejs
```

- [GitHub Repo](https://github.com/bmehder/bedazzle)
- [NPM Package](https://www.npmjs.com/package/bedazzlejs)

---

## License

MIT © [Brad Mehder](https://github.com/bmehder)

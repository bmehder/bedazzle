# 3. From Factory Functions to BedazzleJS: A Case for Functional Decorators

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

// Example of inheritance
class Square extends Rectangle {
  constructor(size) {
    super(size, size);
  }

  describe() {
    return `Square with sides of length ${this.width}`;
  }
}

const rect = new Rectangle(5, 10);
console.log(rect.getArea()); // 50

const square = new Square(5);
console.log(square.getArea()); // 25
console.log(square.describe()); // Square with sides of length 5
```

✅ **Pros:** Familiar pattern, clear structure.  
⚠️ **Cons:** Inheritance trees can get messy as behavior grows or changes. Adding new features often requires extending the class hierarchy or modifying existing classes.

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

// Example of extending a factory function
const createSquare = (size) => {
  const rect = createRectangle(size, size);
  return {
    ...rect,
    describe: () => `Square with sides of length ${size}`,
  };
};

const rect = createRectangle(5, 10);
console.log(rect.getArea()); // 50

const square = createSquare(5);
console.log(square.getArea()); // 25
console.log(square.describe()); // Square with sides of length 5

const rect = createRectangle(5, 10);
console.log(rect.getArea()); // 50
```

✅ **Pros:** No inheritance needed, simple.  
⚠️ **Cons:** All functionality bundled together—harder to compose or extend without repeating code.

---

## The Problem with Both Approaches

Both classes and factory functions force you to **predefine all features up front**. In class-based systems, this often leads to creating subclasses (like `Square` extending `Rectangle`) to add or modify behavior. As the number of features grows, managing these inheritance chains becomes complex and rigid. Alternatively, mixins might be used to share behavior across classes, but they can introduce name collisions and make code harder to follow.

This rigidity makes it difficult to add new functionality—like logging or a plugin system—without either modifying the original class or duplicating code elsewhere.

For example, to avoid deep inheritance chains, you might use mixins like this:

```js
const AreaMixin = Base => class extends Base {
  getArea() {
    return this.width * this.height;
  }
};

const PerimeterMixin = Base => class extends Base {
  getPerimeter() {
    return 2 * (this.width + this.height);
  }
};

class Rectangle {}

Object.assign(
  Rectangle.prototype,
  AreaMixin(class {}).prototype,
  PerimeterMixin(class {}).prototype
);

const rect = new Rectangle();
rect.width = 5;
rect.height = 10;
console.log(rect.getArea()); // 50
console.log(rect.getPerimeter()); // 30
```

While this approach avoids subclassing, it can lead to name collisions and makes the code harder to follow as more mixins are added.

### How BedazzleJS Simplifies This

BedazzleJS avoids both inheritance chains and the mixin pattern entirely. Instead of patching prototypes or worrying about name conflicts, you define each piece of behavior as a pure function that decorates the object.

#### Side-by-Side Comparison

**Mixin Example:**
```js
const AreaMixin = Base => class extends Base {
  getArea() {
    return this.width * this.height;
  }
};

class Rectangle {}
Object.assign(Rectangle.prototype, AreaMixin(class {}).prototype);
const rect = new Rectangle();
rect.width = 5;
rect.height = 10;
console.log(rect.getArea()); // 50
```

**BedazzleJS Example:**
```js
import { bedazzle } from 'bedazzlejs';

const withArea = ({ width, height }) => ({
  getArea: () => width * height,
});

const rectangle = bedazzle({ width: 5, height: 10 }, withArea);
console.log(rectangle.getArea()); // 50
```

✅ **No prototype manipulation**  
✅ **No inheritance chains**  
✅ **No name collisions**  
✅ **Pure, composable functions**

This means:
- No fragile prototype manipulation.
- No deep inheritance trees to maintain.
- No mixin collisions.

Each behavior lives in its own small, testable function—and you compose them as needed, directly onto plain objects.

### Takeaway

The core advantage of BedazzleJS is how naturally it encourages small, isolated units of behavior that can be combined as needed. Rather than baking every possible feature into a class or factory, BedazzleJS lets you layer functionality as your needs evolve.

- ✅ Keep your behaviors modular.
- ✅ Add new features without touching old code.
- ✅ Build flexible systems without inheritance overhead.

When your objects need to grow, BedazzleJS grows with them—gracefully.

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
| Factory Functions | ⚠️ possible (via extension like `createSquare`) | ⚠️ awkward (requires additional functions for each variation) | ✅ yes | ⚠️ tied to specific factory logic |
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


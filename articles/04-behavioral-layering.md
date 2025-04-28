# 4. Progressive Behavior Layering: A New Take on Composition with BedazzleJS

Most JavaScript developers know how to compose **functions**. Tools like `compose`, `pipe`, or method chaining make it easy to transform data one step at a time.

But what about **composing objects**?

What if adding a feature like `getArea()` or `log()` could feel as natural as composing functions — not by subclassing, not by patching prototypes, not by bundling everything into one rigid factory — but by **layering behaviors onto objects, one piece at a time, exactly when you need them**?

This is what **BedazzleJS** makes possible. It’s a small library with one big idea:

> 💎 **Behavior Layering** — progressively decorating objects with pure functions that add methods and properties, composable at runtime.

---

## Behavior Layering vs. Inheritance and Factories

In traditional JavaScript patterns, your options for sharing behavior look something like this:

- ✅ **Classes and inheritance**: Define shared methods on a prototype chain.
- ✅ **Factory functions**: Build objects with methods baked in at construction time.
- ✅ **Mixins**: Patch behaviors across objects or classes.

Each of these comes with tradeoffs:

- Inheritance gets messy as your feature list grows.
- Factories require advance planning (what if you need to add a feature later?).
- Mixins risk name collisions and tangled logic.

**Behavior Layering** offers another way:

- 💎 **Small, pure functions.**
- 🪩 **Applied at runtime, in any order.**
- 🚫 **No mutation of prototypes.**
- 🧩 **Composable like functions — but for objects.**

---

## How Behavior Layering Works

Here’s the basic idea. Each "layer" of behavior is just a function that takes an object (state) and returns an object with new properties or methods:

> *You may have heard the Lego metaphor in functional programming — reusable pieces that click together to build bigger things. In the spirit of Bedazzle, we think of these behaviors as ************‘beads’************ instead: simple, self-contained functions you string together onto your objects as they grow.*

```javascript
const withArea = ({ width, height }) => ({
  getArea: () => width * height,
});

const withPerimeter = ({ width, height }) => ({
  getPerimeter: () => 2 * (width + height),
});
```

You can layer these onto your base object using **BedazzleJS**:

```javascript
import { bedazzle } from 'bedazzlejs';

const rectangle = bedazzle(
  { width: 5, height: 10 },
  withArea,
  withPerimeter
);

console.log(rectangle.getArea());      // 50
console.log(rectangle.getPerimeter()); // 30
```

Each behavior is independent, reusable, and testable. Need a new feature? Just add another *bead*.

---

## Why Not Just Use Lodash or Ramda?

Libraries like **Ramda** and **Lodash** excel at composing functions and transforming data. But they don't offer tools for **composing object behaviors** like this.

- Lodash's `mixin` mutates objects and prototypes.
- Ramda's `merge` tools handle data shape, not behavior.

BedazzleJS is about **behavior composition** — layering capabilities onto objects progressively, without mutation, and without predefining all features up front.

---

## Functional Decoration, Reimagined

In traditional design patterns, the **decorator pattern** often means wrapping objects, or mutating them directly. BedazzleJS flips that idea:

- ✅ No wrapping.
- ✅ No mutation.
- ✅ Just pure functions that return partial objects.

Bedazzle simply merges the results of these functions onto your object, layer by layer.

> 🪩 *Think of each behavior like a bead you add to a bracelet — each one snapping into place, no tangles.*

---

## Why This Pattern Hasn't Been Common in JavaScript

Despite how natural Behavior Layering feels once you see it, this pattern hasn’t been common in JavaScript — until now.

### JavaScript’s OOP Roots

JavaScript's prototype system and later ES6 classes encouraged inheritance and constructor functions as the go-to methods for sharing behavior. Factory functions offered a less hierarchical option but still required defining all behavior at creation time.

### Mixins as a Workaround

Mixins emerged to patch behavior onto objects, but they often lead to name collisions, tangled dependencies, and unclear ordering.

### Functional Composition Focused on Data, Not Behavior

While functional programming libraries like Ramda and Lodash popularized function composition and data transformation, they didn’t extend those ideas to behavior composition for objects.

BedazzleJS fills this gap: bringing the spirit of function composition into the world of object capabilities.

---

## Parallels in Other Languages and Paradigms

The idea of composing behaviors isn't new globally — just underexplored in JavaScript.

### Traits (Rust, Scala, PHP)

Traits allow behavior sharing without inheritance, avoiding many classic OOP pitfalls. BedazzleJS echoes this approach but does it through pure functions instead of language-level constructs.

### Role Composition (Perl, Scala)

Roles are another pattern for behavior reuse, offering flexibility and avoiding the diamond problem. Again, BedazzleJS achieves similar benefits using small functions and object merging.

### Decorator Pattern (OOP Design Patterns)

Traditional decorators often rely on wrapping objects. BedazzleJS borrows the decorator idea but sidesteps wrapping entirely by layering behaviors directly onto plain objects.

### Middleware Chaining (Express, Koa, Redux)

Middleware is a familiar pattern in JavaScript for composing request handlers or reducers. BedazzleJS applies a similar layering concept — but for building objects themselves.

This makes BedazzleJS feel familiar, yet fresh.

---

## The Punchline: It’s Just a Tiny Function

With all this talk about behavior layering, you might expect a big, complex library. But here’s the kicker:

**BedazzleJS is just a small, elegant function.**

Here’s the entire core of BedazzleJS:

```javascript
export function bedazzle(state, ...fns) {
  const reducer = (obj, fn) => ({
    ...obj,
    ...fn(obj, newState => bedazzle(newState, ...fns)),
  });
  return fns.reduce(reducer, state);
}
```

The entire idea of progressive, runtime behavior composition comes from a few simple lines of code — yet unlocks an entirely new way to think about object construction in JavaScript.

You bring the **seed** — your base object.
Bedazzle layers on the **beads** — small, composable behavior functions.
The result? Behavior that grows with your needs, one bead at a time.

If you've ever wished your objects could grow as gracefully as your function chains, give BedazzleJS a try.

```bash
npm install bedazzlejs
```

- [GitHub Repo](https://github.com/bmehder/bedazzle)
- [NPM Package](https://www.npmjs.com/package/bedazzlejs)

---

MIT © [Brad Mehder](https://github.com/bmehder)


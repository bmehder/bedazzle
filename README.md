# 📦 BedazzleJS

[![npm version](https://img.shields.io/npm/v/bedazzlejs.svg)](https://www.npmjs.com/package/bedazzlejs)

> A tiny functional way to decorate objects with composable behaviors.

---

## TL;DR

**BedazzleJS** lets you progressively add methods and properties to objects using pure functions — no classes, no heavy frameworks.

---

## What is BedazzleJS?

BedazzleJS is a tiny library (less than 1KB) that helps you **compose objects from multiple behaviors** without needing class hierarchies, mutation, or complexity.

Instead of rigid blueprints (like classes), you add behaviors one step at a time with small, reusable functions.

---

## Why BedazzleJS?

- ✅ No `class` inheritance mess
- ✅ No framework lock-in
- ✅ Predictable, pure functions
- ✅ Easy to extend, compose, and test
- ✅ Perfect for plugins, middleware, or micro-frameworks

---

## Installation

```bash
npm install bedazzlejs
```

or

```bash
pnpm add bedazzlejs
```

---

## Usage

```js
import { bedazzle } from 'bedazzlejs';

const withWheels = obj => ({
  roll: () => console.log(`Rolling with ${obj.wheels} wheels!`)
});

const withHorn = obj => ({
  honk: () => console.log('Beep beep!')
});

const vehicle = bedazzle({ wheels: 4 }, withWheels, withHorn);

vehicle.roll(); // Rolling with 4 wheels!
vehicle.honk(); // Beep beep!
```

You can easily add more decorators without changing the original object structure.

---

## API

### `bedazzle(state, ...fns)`

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `state` | `Object` | The base object to decorate |
| `...fns` | `Function[]` | Functions that receive the object and return partial objects to merge |

Each function gets the current object and can return new properties, methods, or even call `next()` to continue decorating recursively.

---

## Real-World Ideas

- Add "plugins" dynamically to a system
- Compose UI components without classes
- Create flexible middleware chains
- Design small, testable interfaces
- Create evolving APIs or objects at runtime

---

## How is this Different?

|  | Classes | Factory Functions | BedazzleJS |
|---|---|---|---|
| Extendability | Medium (inheritance) | Medium (closures) | High (pure functions) |
| Testability | Medium | High | Very High |
| Complexity | Higher over time | Moderate | Very Low |

BedazzleJS gives you **the freedom of factories** with **the simplicity of pure functions**.

---

## License

MIT © [Brad Mehder](https://github.com/bmehder)

---

## Contributing

Pull requests, issues, and ideas are welcome!

- Fork the repo
- Create a feature branch
- Submit a pull request 🚀


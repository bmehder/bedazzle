## What Is BedazzleJS?

BedazzleJS is a small JavaScript library that helps you build smarter, more modular objects by layering on functionality — one behavior at a time.

Instead of using classes or deep inheritance trees, BedazzleJS uses plain functions called **beads** to decorate an object with capabilities like logging, undo/redo, validation, or persistence.

---

### 🤔 Why use it?

If you've ever:

- Wanted to reuse a method across different object types
- Found yourself duplicating behavior across similar components
- Gotten stuck in a mess of class inheritance or tightly coupled logic

Then BedazzleJS helps you escape all that by using **functional composition** instead of object-oriented inheritance.

---

### 🧱 How does it work?

You start with a plain object, like:

```js
const base = { name: "RocketBot" };
```

Then you decorate it with behavior using beads:

```js
const withGreeting = (obj) => ({
  greet: () => `Hello from ${obj.name}!`
});

const withLogger = (obj) => ({
  log: () => console.log("[log]", obj)
});
```

Now apply them using `bedazzle`:

```js
import { bedazzle } from "bedazzlejs";

const bot = bedazzle(base, withGreeting, withLogger);

bot.greet(); // "Hello from RocketBot!"
bot.log();   // Logs the full object
```

✅ No class
✅ No inheritance
✅ No boilerplate constructors

---

### 🔄 It's just composition

Beads are like Lego bricks — each one adds a behavior. You can compose them in any order, reuse them across objects, and test them like pure functions.

```js
const withPoweredOn = (obj, redecorate) => ({
  powerOn() {
    return redecorate({ ...obj, powered: true });
  }
});

let bot = bedazzle(base, withGreeting, withPoweredOn);
bot = bot.powerOn();
console.log(bot.powered); // true
```

Even when state changes, `bedazzle` returns a brand-new object — keeping everything immutable and composable.

---

### 🧩 Summary

BedazzleJS lets you:

- Build plain objects with rich behaviors
- Compose functionality using small, testable beads
- Avoid classes, inheritance, and boilerplate
- Chain methods and return new state safely

It looks familiar, but it’s pure composition under the hood.

If you can write a function, you can write a bead.

Ready to get started? Try building your first decorated object with `bedazzle(base, beads...)`!


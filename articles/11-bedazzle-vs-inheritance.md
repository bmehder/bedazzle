## BedazzleJS vs Inheritance vs Composition: A Visual Guide

JavaScript gives you many ways to build objects — from classes and prototypes to factory functions and object composition. BedazzleJS introduces a functional take on composition, but how does it actually compare?

This guide walks through three common approaches to adding behavior to an object — and shows how BedazzleJS simplifies things.

---

### 🧱 1. Class Inheritance (Traditional OO)

```js
class Robot {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hi, I'm ${this.name}`;
  }
}

class LoggingRobot extends Robot {
  log() {
    console.log(`[log] ${this.name}`);
  }
}

const bot = new LoggingRobot("Unit9");
bot.greet(); // "Hi, I'm Unit9"
bot.log();   // [log] Unit9
```

✅ Familiar syntax
❌ Inflexible: mixins, multiple inheritance, and testing are harder

---

### 🏭 2. Factory Composition

```js
const createBot = (name) => ({
  name,
  greet: () => `Hi, I'm ${name}`
});

const withLogger = (bot) => ({
  ...bot,
  log: () => console.log(`[log] ${bot.name}`)
});

const bot = withLogger(createBot("Unit9"));
bot.greet(); // "Hi, I'm Unit9"
bot.log();   // [log] Unit9
```

✅ Very flexible
✅ No classes or inheritance
❌ Boilerplate grows quickly as behaviors stack
❌ No built-in chaining or rebinding

---

### 💫 3. BedazzleJS Composition

```js
const withGreeting = (obj) => ({
  greet: () => `Hi, I'm ${obj.name}`
});

const withLogger = (obj) => ({
  log: () => console.log(`[log] ${obj.name}`)
});

const bot = bedazzle({ name: "Unit9" }, withGreeting, withLogger);
bot.greet(); // "Hi, I'm Unit9"
bot.log();   // [log] Unit9
```

✅ Small, reusable behaviors (beads)
✅ Clear order of composition
✅ Built-in `redecorate()` for chaining updated state
✅ No boilerplate or inheritance

---

### 🧠 Summary Table

| Feature             | Class Inheritance | Factory Composition | BedazzleJS        |
|---------------------|-------------------|----------------------|--------------------|
| Uses `class`        | ✅                | ❌                   | ❌                 |
| Composable          | ❌ (limited)      | ✅                   | ✅                 |
| Reusable behaviors  | ⚠️ Fragile        | ✅                   | ✅                 |
| Testable units      | ❌ Often coupled  | ✅                   | ✅                 |
| Behavior chaining   | ❌                | ❌                   | ✅                 |
| Encourages reuse    | ⚠️ Base class trap | ✅                  | ✅                 |

---

### ✨ Final Thought

BedazzleJS brings the flexibility of functional composition into a clean, chainable system — with less boilerplate and better ergonomics than classes or vanilla factories.

If you love the simplicity of plain objects but want structure and power, Bedazzle gives you the best of both worlds.


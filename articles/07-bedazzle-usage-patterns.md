## Common Usage Patterns for BedazzleJS

BedazzleJS is a functional composition engine that helps you build objects by layering on small, reusable behaviors called beads. It avoids classes and inheritance in favor of pure functions and plain objects. But with this flexibility comes the need for clear patterns. This guide outlines six common bead styles and when to use each.

---

### 1. 📦 Static Bead

Add methods or values that don't change with state updates.

```js
const withGreeting = obj => ({
  greet: () => `Hello from ${obj.name}`
});
```

✅ Use when: `obj` is fixed and doesn't need to respond to future changes

---

### 2. 🔁 Dynamic Bead

Use `this` so methods reflect the current state.

```js
const withGreeting = () => ({
  greet() {
    return `Hello from ${this.name}`;
  }
});
```

✅ Use when: you want methods to reflect updated state
⚠️ Avoid arrow functions inside dynamic beads — they capture lexical `this`

---

### 3. 🧪 Pure Behavior Bead

Expose a method that uses internal data to calculate or log something.

```js
const withLapTime = car => ({
  estimateLapTime(track) {
    return 60 * track.length / car.topSpeed;
  }
});
```

✅ Stateless
❌ Does not modify or recreate the object

---

### 4. 🛠 State-Modifying Bead

Return a new object — you **must** call `redecorate()`.

```js
const withTurbo = (car, redecorate) => ({
  addTurbo(level = 1) {
    return redecorate({
      ...car,
      topSpeed: car.topSpeed + level * 10
    });
  }
});
```

✅ Use when: you're changing or replacing the object

---

### 5. 🎛️ Configurable Bead

Use a factory function to customize the bead.

```js
const withLogger = (label = "") => (obj) => ({
  log() {
    console.log(`[${label}]`, obj);
  }
});
```

✅ Allows parameters like namespaces, options, formats

---

### 6. 🧹 Side-effect Bead

Perform an effect without returning new methods or state.

```js
const withAutosave = (key) => (obj) => {
  localStorage.setItem(key, JSON.stringify(obj));
  return {}; // No new methods — just effect
};
```

✅ Use when: you want logging, analytics, sync, etc.

---

## Quick Reference Table

| Pattern           | Use `redecorate()`? | Uses `this`? | Callable as...       |
| ----------------- | ------------------- | ------------ | -------------------- |
| Static Method     | ❌                   | ❌            | `withX`              |
| Dynamic Method    | ❌                   | ✅            | `withX()`            |
| State Transformer | ✅                   | ❌ / ✅        | `withX` or `withX()` |
| Behavior Only     | ❌                   | ❌            | `withX`              |
| Side Effect       | ❌                   | ❌            | `withX()`            |

---

Use these patterns to keep your beads consistent, testable, and readable — and you'll unlock the full power of BedazzleJS without the confusion.


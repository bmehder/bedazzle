## Bead Ergonomics: Writing Reusable, Predictable BedazzleJS Behaviors

BedazzleJS gives developers a powerful composition engine-letting you add behaviors to plain objects using small functions called *beads*. But beyond simply "making it work," there's a second layer of craft: **bead ergonomics**. That means writing beads that are easy to read, chain, test, and share.

This article outlines practical guidelines for writing high-quality, ergonomic beads.

---

### 1. 🎯 Keep Beads Focused

Each bead should do *one thing well*. Avoid beads that combine unrelated responsibilities.

```js
// ✅ Better
const withLogger = () => ({ log() { /* ... */ } });
const withAutosave = () => ({ save() { /* ... */ } });

// ❌ Harder to maintain
const withLoggerAndSave = () => ({
  log() { /* ... */ },
  save() { /* ... */ }
});
```

---

### 2. 🧩 Choose the Right Callable Shape

There are two common bead forms:

- A direct decorator: `withX`
- A factory: `withX(options)`

Use factories when your bead needs configuration.

```js
const withLogger = (label) => (obj) => ({
  log() { console.log(`[${label}]`, obj); }
});
```

Make sure the shape of your bead is predictable to callers.

---

### 3. 🔤 Name Clearly and Consistently

- Always use the `withX` prefix
- Keep the name focused and descriptive
- Avoid mixing verbs or broad terms

```js
// ✅ Good
withUndoRedo
withThrottle
withValidation

// ❌ Confusing or redundant
addUndoBehavior
enableWithLoggingAndSave
```

---

### 4. 🔁 Design for Composition

Bedazzle beads are merged together, so don't assume your bead is the only one adding `.log()` or `.summary()`.

- Avoid property collisions
- Consider namespacing: `logger.log()`, `audit.log()`

Also, beads that change state should return redecorated objects so chaining continues to work.

```js
const withTurbo = (car, redecorate) => ({
  addTurbo(level) {
    return redecorate({
      ...car,
      topSpeed: car.topSpeed + level * 10
    });
  }
});
```

---

### 5. ⚙️ Parameterize Cleanly

If your bead accepts options, make it intuitive. Use named arguments where ambiguity is possible.

```js
// ✅ Clear and flexible
withRetry({ attempts: 3, delay: 500 });

// ❌ Too positional, unclear
withRetry(3, 500);
```

Prefer predictable defaults and minimal surface area.

---

### 6. 🧪 Test Like a Pure Function

Beads are just functions. You can test them in isolation.

```js
const obj = { counter: 0 };
const decorated = withCounter(obj);

expect(decorated.increment()).toEqual({ counter: 1 });
```

When you use `redecorate`, test the resulting chain:

```js
const chain = bedazzle(obj, withCounter, withLogger);
const next = chain.increment();
expect(next.log).toBeDefined();
```

---

### Conclusion

BedazzleJS lets you work with flexible, composable behaviors — but the real power comes when your beads are ergonomic. Clean bead design:

- Encourages reuse
- Prevents naming conflicts
- Enables easy testing
- Keeps APIs friendly to others

Write beads you’d want to use twice. ✨


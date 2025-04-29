# State Changes the BedazzleJS Way: Immutable, Predictable, Beautiful

One of the key ideas in BedazzleJS is how it handles **state changes without mutating the object**.

Instead of updating the object in place, Bedazzle creates a **new decorated object** by re-running the entire decoration process over a new version of the state.

This idea is critical to understanding Bedazzle's integrity and immutability.

Let's walk through it carefully.

---

## 🯩 The Core Flow

When you create a decorated object in Bedazzle, you start with:

```javascript
const decorated = bedazzle(state, withA, withB, withC);
```

- `state` is the plain data object.
- `withA`, `withB`, `withC` are pure decoration functions (beads) that layer behavior.

The important part: **these decorators are layered in order** to produce the final object.

## 🔄 How Bedazzle Handles State Changes

When you want to "change" the state (for example, increment a counter), you don't modify the existing object.

Instead, you:
- Create a new version of the state.
- Restart the full decoration cascade over the new state.

This re-decoration (or, rebadazzling, if you will) produces a **new object** with updated behavior and state.

## 🛠️ Example: Simple Counter

### Bead:
```javascript
function withCounter(obj, bedazzle) {
  return {
    getCount() {
      return obj.count;
    },
    increment() {
      const newState = { ...obj, count: obj.count + 1 };
      return bedazzle(newState);
    }
  };
}
```

### Usage:
```javascript
const initial = { count: 0 };
const counter = bedazzle(initial, withCounter);

console.log(counter.getCount()); // 0

const updatedCounter = counter.increment();
console.log(updatedCounter.getCount()); // 1
```

**What happens under the hood:**
- `increment()` creates a new `{ count: 1 }` state object.
- It calls `bedazzle(newState)`, which triggers Bedazzle to recursively apply all beads again over the new state.
- You get a fresh, fully decorated object — with updated state.

This recursion is a key part of Bedazzle's design. Functional programmers will appreciate that Bedazzle handles state changes using **pure recursion**, not mutation.

## 🌀 Why Not Just Update Directly?

Without re-decoration, every bead would have to manually:
- Track which behaviors to add.
- Know the order of decoration.
- Rebuild the object manually.

It would be error-prone, inconsistent, and messy.

Bedazzle's re-decoration flow ensures:
- **Immutable layering** (no mutations).
- **Order-sensitive behavior** (later beads can depend on earlier ones).
- **Consistent structure** every time.

## 📚 Key Takeaways

- Bedazzle's re-decoration is about **clarity and predictability**.
- When state changes, **the object is rebuilt** from the new state, not mutated.
- Decorators (beads) describe behavior — they don't manage state directly.

## 🌟 Re-decoration in Action

When a bead needs to produce an updated object with new state, it doesn't mutate anything — it **calls Bedazzle again**.

This recursive call applies the full decoration cascade to the new state, ensuring that the object remains fully layered and consistent.

Whenever a method like `increment()` triggers a state change, it effectively tells Bedazzle to **rebadazzle** the object from scratch — layering all behaviors again over the new state.

This gives BedazzleJS its predictability, elegance, and compositional strength.

---

## 🎯 Visual Summary

```
Original State -> withA -> withB -> withC -> Decorated Object

|
|-- (state changes)
|
V

New State -> withA -> withB -> withC -> New Decorated Object
```

Each time the state changes, Bedazzle restarts the full cascade from the beginning — reapplying all the layers in order.

## 💬 Final Thought

The genius of Bedazzle isn't in a clever syntax trick — it's in honoring immutability, layering, and composable behavior in a predictable, elegant way.

If you understand the re-decoration model, you've understood the beating heart of BedazzleJS.
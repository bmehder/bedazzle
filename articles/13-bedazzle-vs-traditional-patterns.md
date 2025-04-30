# BedazzleJS vs Traditional Patterns: Behavior Composition Made Easy

Let’s say you want to build a simple model with these behaviors:

- It tracks a `count`
- It logs every time it changes
- It remembers the `lastUpdated` timestamp

We’ll compare how this is handled in traditional class-based or factory-based code vs how it’s layered with BedazzleJS.

---

## 😩 Traditional Approach (Factory Example)

This works, but gets clumsy quickly:

```js
function createModel(name) {
  let count = 0;
  let lastUpdated = null;

  return {
    getCount() {
      return count;
    },
    increment() {
      count++;
      lastUpdated = new Date().toISOString();
      console.log(`[${name}] Count is now ${count}`);
    },
    getLastUpdated() {
      return lastUpdated;
    }
  };
}

const model = createModel("MyApp");
model.increment();
```

### Problems:
- Logic is tangled — state updates, logging, and timestamping live in one method
- No layering or reusability
- Hard to override or replace behaviors cleanly

---

## 😩 Traditional Approach (Class Example)

```js
class CounterModel {
  constructor(name) {
    this.name = name;
    this.count = 0;
    this.lastUpdated = null;
  }

  getCount() {
    return this.count;
  }

  increment() {
    this.count++;
    this.lastUpdated = new Date().toISOString();
    console.log(`[${this.name}] Count is now ${this.count}`);
  }

  getLastUpdated() {
    return this.lastUpdated;
  }
}

const model = new CounterModel("MyApp");
model.increment();
```

### Problems:
- Tight coupling between logic and structure
- All behavior lives in one class — hard to isolate or reuse features
- You can’t easily “remove logging” or “swap timestamp logic”
- `this`-binding and mutation dominate the mental model


- Logic is tangled — state updates, logging, and timestamping live in one method
- No layering or reusability
- Hard to override or replace behaviors cleanly

---

## 😩 Traditional Approach (Object Composition with Spread)

```js
const withCounter = (state) => ({
  increment() {
    state.count++;
  },
  getCount() {
    return state.count;
  }
});

const withLogger = (state, label) => ({
  increment() {
    state.count++;
    console.log(`[${label}] Count is now ${state.count}`);
  }
});

const withTimestamp = (state) => ({
  increment() {
    state.count++;
    state.lastUpdated = new Date().toISOString();
  },
  getLastUpdated() {
    return state.lastUpdated;
  }
});

const createModel = (label) => {
  const state = { count: 0, lastUpdated: null };
  return {
    ...withCounter(state),
    ...withLogger(state, label),
    ...withTimestamp(state),
  };
};

const model = createModel("MyApp");
model.increment();
```

### Problems:
- All methods write to the same shared state object — risk of mutation bugs
- `increment` is overwritten three times — only the last one survives unless manually reconciled
- No clean override chain like `super` or `call(base)`
- Can’t layer behaviors predictably or in isolation---

## ✨ BedazzleJS Approach (Layered Beads)

```js
const withCounter = () => (base) => ({
  ...base,
  count: 0,
  increment() {
    return { ...this, count: this.count + 1 };
  },
  getCount() {
    return this.count;
  },
});

const withLogger = (label) => (base) => ({
  ...base,
  increment() {
    const updated = base.increment.call(this);
    console.log(`[${label}] Count is now ${updated.count}`);
    return updated;
  },
});

const withTimestamp = () => (base) => ({
  ...base,
  increment() {
    const updated = base.increment.call(this);
    return { ...updated, lastUpdated: new Date().toISOString() };
  },
  getLastUpdated() {
    return this.lastUpdated;
  },
});

const model = bedazzle({}, withCounter(), withLogger("MyApp"), withTimestamp());
const updated = model.increment();
```

### But Wait — Why Are We Calling `base.increment.call(this)`?

It might seem strange at first:

> If we're just calling the previous `increment`, why even redefine it in each bead?

**This is the part that makes Bedazzle powerful.**

Each bead can *wrap*, *augment*, or *override* behavior. The call to `base.increment.call(this)` is like a functional `super` — it gives you access to the behavior below so you can layer additional logic *without replacing it blindly*.

You control:
- When and if the lower layer runs
- What to do before or after it
- What to return instead

This gives you predictable overrides — something mixins and composition often struggle with.

### Benefits:
- 🔁 Behavior is modular and layered
- 🔍 Each concern is isolated: counting, logging, timestamps
- ✅ No mutation — every update returns a new object
- 🧩 Easy to reuse, extend, or override any piece

---

## TL;DR

| Feature | Classes | Factory | Object Spread | BedazzleJS |
|---------|---------|---------|----------------|-------------|
| Composable behaviors | ❌ Hard-coded | ❌ Manual copy-paste | ⚠️ Merge manually | ✅ Beads you can mix + match |
| Override order | ❌ Requires subclassing | ❌ Manual | ❌ Last one wins | ✅ Explicit layering |
| Separation of concerns | ❌ Tightly coupled | ❌ Intertwined logic | ⚠️ Split but brittle | ✅ Cleanly separated |
| Immutability | ❌ Shared state | ❌ Shared state | ❌ Mutates shared object | ✅ Built-in |

---

This is what BedazzleJS makes *trivial*. No inheritance, no mutation, no boilerplate — just composable, functional behavior.

Want more? [Check out the counter app example](https://github.com/yourname/bedazzlejs/tree/main/examples/counter).


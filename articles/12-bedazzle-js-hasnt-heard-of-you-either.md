# BedazzleJS Hasn't Heard of You Either

JavaScript developers are restless. We’ve wrestled with classes, been burned by mixins, and overused `Object.assign` until our methods collide. We’ve danced around a better pattern for years — something clean, composable, predictable.

What if you could layer behavior like middleware, override logic safely, and keep everything immutable — all without a framework or build step?

That’s where **BedazzleJS** comes in.

---

## 👀 What is BedazzleJS?

BedazzleJS is a tiny utility for layering behavior onto objects. Instead of extending classes or merging mixins, you compose functional decorators called **beads**.

Each bead adds or overrides behavior. Beads are ordered, immutable, and easily reusable. The result? Predictable object composition that actually scales.

```js
const model = bedazzle({}, withCounter(), withLogger("App"));
const updated = model.increment();
```

---

## ⚡ Why Should You Care?

Bedazzle hits on several pain points that devs experience every day:

### 1. Composability Without a Framework
You want structure — not another dependency.

Bedazzle gives you just enough abstraction to clean up logic without requiring a class system, runtime, or virtual DOM. It fills the gap between "just use objects" and "import a full UI library."

- ✅ Works with vanilla JS
- ✅ No build tools required
- ✅ No inheritance or prototypes

### 2. Predictable Overrides
Mixins can be chaos. Who overrides what? In what order?

Bedazzle gives you decorator-style control:

- ✅ Later beads override earlier ones
- ✅ You can still call the method you overrode (`base.method.call(this)`)
- ✅ Composition is *ordered*, not accidental

### 3. Immutability by Default
Each method returns a new object with updated state. That makes Bedazzle a great match for functional programming, pure reducers, and modern state models.

- ✅ No mutation
- ✅ Snapshot-friendly
- ✅ Debuggable and testable

### 4. Zero Barrier to Entry
You can use Bedazzle in a script tag. That’s it.

It’s approachable for:
- Indie devs
- Educators
- Functional programming fans
- Framework-free hobbyists

---

## 🔎 Is Anyone Asking for This?

They might not know the name — but they’re definitely asking for the solution.

| What devs want | What Bedazzle offers |
|----------------|-----------------------|
| Avoid deep class hierarchies | ✅ Functional composition |
| Build reusable traits | ✅ Beads with scoped logic |
| Clean up state logic | ✅ Layered, immutable models |
| Mixins without collisions | ✅ Ordered, override-safe layering |
| Plugin-like behavior | ✅ Pure function decorators |

---

## 💡 Where BedazzleJS Fits Naturally

Here are some of the real-world contexts where BedazzleJS shines:

### Real Use Cases
- A game entity system
- Undo/redo logic in a form
- Composable plugin architecture
- UI state modeling without React

### How to Talk About It
> “Like mixins, but predictable and order-sensitive.”  
> “Layer behavior like decorators. Return new objects. No framework needed.”

### Where It Sits in the Ecosystem
BedazzleJS overlaps with a few categories, but doesn't fall neatly into any single one:

- **Like Lodash**, it encourages modular, functional design — but for behavior, not data.
- **Like Zustand or Valtio**, it deals with state — but it's not a store, just stateful composition.
- **Like React hooks**, it encapsulates logic — but in plain objects, without JSX or components.
- **Like plugin systems**, it layers functionality — but without complex lifecycles or dependency graphs.

That makes BedazzleJS uniquely positioned as a minimalist pattern for structured, scalable behavior.

---

## 🧠 Why BedazzleJS Could Catch On

BedazzleJS addresses real, recurring challenges that developers face — and it does so with clarity and minimalism.

Even if people aren't searching for it by name, they're looking for solutions to:

- messy mixins
- brittle state logic
- framework-free composition

It's not trying to compete with React or replace state libraries — but it fills a niche many devs feel, even if they haven’t articulated it yet.

BedazzleJS could quietly work its way into the toolkits of developers who value:

- **composability**
- **clarity**
- **functional reuse**

It’s the kind of tool that developers adopt because it feels right — and keep using because it keeps working.

---

Try it. Fork it. Bedazzle something.

[👉 See the counter example](https://github.com/yourname/bedazzlejs/tree/main/examples/counter)


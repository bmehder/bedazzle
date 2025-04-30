## Your First Bedazzled Object

This short tutorial walks you through building your first object using BedazzleJS — a functional composition library that lets you layer behaviors onto plain JavaScript objects using small, reusable functions called beads.

No classes, no magic — just clean, testable composition.

---

### ✅ Step 1: Install BedazzleJS

```bash
npm install bedazzlejs
```

Or use it directly in your browser with a script tag:

```html
<script type="module">
  import { bedazzle } from 'https://cdn.skypack.dev/bedazzlejs';
</script>
```

---

### 🧱 Step 2: Create a Base Object

You can start with any plain JavaScript object:

```js
const baseBot = {
  name: "HelperBot",
  powered: false
};
```

---

### 💎 Step 3: Define Some Beads

A **bead** is just a function that takes the object and returns new methods or values to merge in.

```js
const withGreeting = (obj) => ({
  greet: () => `Hello from ${obj.name}!`
});

const withPower = (obj, redecorate) => ({
  powerOn() {
    return redecorate({ ...obj, powered: true });
  },
  powerOff() {
    return redecorate({ ...obj, powered: false });
  }
});
```

---

### 🪄 Step 4: Bedazzle It

Use the `bedazzle()` function to apply the beads:

```js
import { bedazzle } from 'bedazzlejs';

let bot = bedazzle(baseBot, withGreeting, withPower);
```

Now your object has new methods:

```js
bot.greet();       // "Hello from HelperBot!"
bot = bot.powerOn();
console.log(bot.powered); // true
```

Every call to a state-changing method returns a new object, preserving immutability.

---

### 🧪 Step 5: Add Your Own Behavior

Try writing your own bead:

```js
const withStatus = (obj) => ({
  report() {
    return `${obj.name} is ${obj.powered ? 'ON' : 'OFF'}`;
  }
});

bot = bedazzle(bot, withStatus);
console.log(bot.report()); // "HelperBot is ON"
```

---

### 🎉 That’s It!

You’ve built your first Bedazzled object:
- Started from a plain object
- Added behaviors with reusable beads
- Returned new state with each change

With BedazzleJS, your objects stay simple, predictable, and easy to test.

Try building your own beads next!


# Flexible Plugin Systems with BedazzleJS

[![npm version](https://img.shields.io/npm/v/bedazzlejs.svg)](https://www.npmjs.com/package/bedazzlejs)

---

## Why Plugins Matter

Plugins are a fantastic way to make your applications more flexible and modular. Instead of hard-coding every feature, you allow users — or even future-you — to "plug in" new behaviors without touching the core code.

Traditionally, setting up a plugin system can get complicated quickly. You might have to deal with class inheritance, deep event systems, or heavy frameworks.

**What if you could build a clean plugin system with just pure functions?**

Enter: **BedazzleJS**.

---

## Building a Plugin System with BedazzleJS

Let's say we're building a simple blogging platform. At its core, we have a `Post` object:

```js
const basePost = {
  title: 'Hello World',
  content: 'This is my first post.'
};
```

Now, we want to allow plugins that can add features to a post, like:

- Timestamps
- Slug generation
- Comment sections
- Social sharing buttons

With BedazzleJS, each of these can be written as **a pure function that decorates the post**.

---

### Example Plugins

**Add Timestamps**
```js
const withTimestamps = obj => ({
  createdAt: new Date(),
  updatedAt: new Date()
});
```

**Generate a Slug**
```js
const withSlug = ({ title }) => ({
  slug: title.toLowerCase().replace(/\s+/g, '-')
});
```

**Add Comments**
```js
const withComments = obj => ({
  comments: [],
  addComment: (comment) => obj.comments.push(comment)
});
```

**Add Social Sharing**
```js
const withSocialSharing = ({ slug }) => ({
  share: () => console.log(`Sharing post at /posts/${slug}`)
});
```

---

### Composing the Plugins

Now, we can combine all these plugins together easily:

```js
import { bedazzle } from 'bedazzlejs';

const post = bedazzle(
  basePost,
  withTimestamps,
  withSlug,
  withComments,
  withSocialSharing
);

console.log(post.slug); // "hello-world"

post.addComment('Awesome post!');
console.log(post.comments); // [ 'Awesome post!' ]

post.share(); // Sharing post at /posts/hello-world
```

---

## Why This Approach Rocks

- ✨ **Pure functions**: Easy to test and reason about
- ✨ **Composable**: Add, remove, or swap plugins anytime
- ✨ **Predictable state**: No hidden side effects
- ✨ **Lightweight**: No classes, no event systems, no heavy frameworks

---

## Final Thoughts

BedazzleJS gives you a simple, elegant way to build plugin systems, feature toggles, and evolving objects — all without sacrificing clarity.

If you’re tired of big, complicated plugin architectures, try **bedazzling** your next project instead. ✨

---

## Learn More

- [GitHub Repo](https://github.com/bmehder/bedazzle)
- [NPM Package](https://www.npmjs.com/package/bedazzlejs)

---

## License

MIT © [Brad Mehder](https://github.com/bmehder)


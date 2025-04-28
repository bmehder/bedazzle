
# 1. A Deep Dive into Composability with BedazzleJS

In the world of JavaScript, composability refers to the ability to combine smaller, reusable functions to build more complex functionality. This approach leads to cleaner, more maintainable code, and **BedazzleJS** makes it exceptionally easy to apply this principle when working with objects.

BedazzleJS is a library that allows you to **decorate** your objects with new methods and properties in a modular, composable way. It lets you break down object behavior into small, reusable pieces that can be applied selectively. The best part? You can combine multiple decorators (functions) to progressively enhance an object.

Let’s break down how this works in **BedazzleJS** and explore why composability is such a game-changer for developers.

## What Does Composability Mean in BedazzleJS?

Imagine you’re creating a **car** object. The car has some basic properties, like `model` and `engineType`. However, you also want to give it additional behaviors, such as calculating its speed or checking if it’s electric.

With **composability**, you don’t have to bundle everything into one monolithic object constructor. Instead, you can create small, independent functions that add specific functionality (like calculating speed) and then combine them.

In BedazzleJS, these functions are called **decorators**. A decorator function takes an object and adds new methods or properties to it. The beauty of BedazzleJS lies in the fact that you can **combine** these decorators in any order, creating flexible and reusable objects.

### A Simple Example

Let’s say you have a basic object that represents a **rectangle** with just `width` and `height`. But you want to add more behavior to it, like calculating its area, perimeter, and diagonal length.

Instead of creating a huge constructor function, you can use BedazzleJS to apply decorators that progressively **decorate** the object with the needed properties.

```js
import { bedazzle } from 'bedazzlejs';

const withGetArea = ({ width, height }) => ({
  getArea: () => width * height
});

const withGetPerimeter = ({ width, height }) => ({
  getPerimeter: () => 2 * (width + height)
});

const withGetDiagonalLength = ({ width, height }) => ({
  getDiagonalLength: () => Math.sqrt(width ** 2 + height ** 2)
});

// Using BedazzleJS to compose the object with the decorators
const rectangle = bedazzle({ width: 5, height: 10 }, withGetArea, withGetPerimeter, withGetDiagonalLength);

console.log(rectangle.getArea()); // 50
console.log(rectangle.getPerimeter()); // 30
console.log(rectangle.getDiagonalLength()); // 11.18
```

### How Does Composability Help?

1. **Modularity**: You can break down functionality into smaller, focused functions, and reuse them across different objects.
2. **Flexibility**: You can apply the decorators in any order. Want to add a `getVolume` method later? No problem. You can just add another decorator.
3. **Separation of Concerns**: Each decorator focuses on adding a specific feature or behavior. This keeps your code clean and easy to reason about.

### Real-World Use Case: Building a Plugin System

Imagine you’re building a web app with customizable components. Each component may need additional functionality, like logging, theming, or analytics tracking. Instead of hardcoding all of these features into every component, you can use **BedazzleJS** to apply decorators as needed.

```js
const withLogging = obj => ({
  log: () => console.log('Logging data:', obj)
});

const withTheming = obj => ({
  theme: theme => obj.theme = theme
});

const withTracking = obj => ({
  trackEvent: event => console.log('Tracking event:', event)
});

const component = bedazzle({}, withLogging, withTheming, withTracking);

component.log(); // Logging data: {}
component.theme('dark'); // { theme: 'dark' }
component.trackEvent('user-click'); // Tracking event: user-click
```

In this example, you’ve enhanced your component with three separate decorators: one for logging, one for theming, and one for tracking events. The beauty of composability here is that these decorators are **independent** and can be combined in any order.

### Composability in Action: Middleware and Extensibility

One of the most powerful use cases for composability is in **middleware** systems. Middleware is code that sits between a request and its response, modifying the data along the way. By using BedazzleJS, you can create middleware for things like authentication, validation, and more.

```js
const withAuthentication = obj => ({
  authenticate: () => console.log('Authenticating user...')
});

const withValidation = obj => ({
  validate: () => console.log('Validating input...')
});

const withErrorHandling = obj => ({
  handleError: () => console.log('Handling error...')
});

// Composing the middleware
const apiMiddleware = bedazzle({}, withAuthentication, withValidation, withErrorHandling);

apiMiddleware.authenticate(); // Authenticating user...
apiMiddleware.validate(); // Validating input...
apiMiddleware.handleError(); // Handling error...
```

Each middleware function can be independently written and reused across different API endpoints, making it easier to maintain and extend your system.

### When Should You Use Composability?

Composability is useful when:

- You want to create objects or systems that are **flexible** and can be easily extended.
- You want to **avoid rigid, large codebases** with hard-to-manage dependencies.
- You prefer to **build small, reusable functions** that can be composed into larger systems.

**BedazzleJS** gives you a lightweight, functional approach to building complex objects without the overhead of classes or factory functions. It’s a simple yet powerful pattern that can be used across a wide variety of JavaScript projects, from web apps to node-based tools.

---

I hope this gives you a comprehensive overview of **composability** and how BedazzleJS can help you implement it in a clean, maintainable way. Ready to give it a try? Start composing your objects today with BedazzleJS!

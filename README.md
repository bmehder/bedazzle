# bedazzle ✨

Bedazzle your objects with progressive decorators!

```js
import { bedazzle } from './bedazzle.js';

const withGlitter = obj => ({ sparkle: () => console.log('✨', obj) });

const magic = bedazzle({ type: 'hat' }, withGlitter);

magic.sparkle(); // ✨ { type: 'hat' }

🍃 Lightweight (~300 bytes)

🧠 Functional and composable

🎨 Designed for dynamic object enhancement

# bedazzle

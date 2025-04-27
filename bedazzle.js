/**
 * Bedazzle - progressively decorate an object with new properties and methods
 * @param {Object} state - The base object
 * @param {...Function} fns - Decorator functions (obj, next) => partial object
 * @returns {Object} - A fully decorated object
 */
export function bedazzle(state, ...fns) {
	const reducer = (obj, fn) => ({
		...obj,
		...fn(obj, newState => bedazzle(newState, ...fns)),
	})
	return fns.reduce(reducer, state)
}


// If you want, you could later add:

// A bedazzle.flow(...fns) function that returns a reusable decorator

// A debug mode to track the decoration steps

// A bedazzle.mergeStrategies feature if you want more control over how properties merge

// Tiny helpers like withLogger built-in
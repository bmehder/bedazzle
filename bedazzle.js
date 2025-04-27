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
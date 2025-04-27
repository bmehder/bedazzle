import { bedazzle } from './bedazzle.js'

// Fake decorators
const withArea = ({ width, height }) => ({
	getArea: () => width * height,
})

const withPerimeter = ({ width, height }) => ({
	getPerimeter: () => 2 * (width + height),
})

const withLogger = obj => ({
	log: () => console.log(JSON.stringify(obj)),
})

function test(description, fn) {
	try {
		fn()
		console.log(`✅ ${description}`)
	} catch (err) {
		console.error(`❌ ${description}`)
		console.error(err)
	}
}

function assert(condition, message = 'Assertion failed') {
	if (!condition) {
		throw new Error(message)
	}
}

// Tests

test('bedazzle should add methods from decorators', () => {
	const rect = bedazzle({ width: 5, height: 10 }, withArea, withPerimeter)

	assert(typeof rect.getArea === 'function', 'Missing getArea')
	assert(typeof rect.getPerimeter === 'function', 'Missing getPerimeter')
	assert(rect.getArea() === 50, 'Incorrect area')
	assert(rect.getPerimeter() === 30, 'Incorrect perimeter')
})

test('bedazzle should preserve original properties', () => {
	const rect = bedazzle({ width: 5, height: 10 }, withArea)
	assert(rect.width === 5, 'Width changed')
	assert(rect.height === 10, 'Height changed')
})

test('bedazzle should allow multiple decorations', () => {
	const rect = bedazzle({ width: 3, height: 7 }, withArea, withPerimeter, withLogger)
	assert(typeof rect.getArea === 'function', 'Missing getArea')
	assert(typeof rect.log === 'function', 'Missing log')
})

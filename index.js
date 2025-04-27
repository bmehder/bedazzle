import { bedazzle } from './bedazzle.js'

const withArea = ({ width, height }) => ({
	getArea: () => width * height,
})

const withPerimeter = ({ width, height }) => ({
	getPerimeter: () => 2 * (width + height),
})

const withToString = obj => ({
	toString: () => JSON.stringify(obj, null, 2),
})

const rect = bedazzle(
	{ width: 10, height: 5 },
	withArea,
	withPerimeter,
	withToString
)

console.log(rect.getArea())
console.log(rect.getPerimeter())
console.log(rect.toString())

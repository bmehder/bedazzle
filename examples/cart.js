import { bedazzle } from '../bedazzle.js'

// 1. Base cart state
const initialCart = {
	items: [],
	subtotal: 0,
	discounts: 0,
	tax: 0,
	shipping: 0,
}

// 2. Decorators
const withAddItem = (cart, rebadazzle) => ({
	addItem(item) {
		const updatedItems = [...cart.items, item]
		const newSubtotal = updatedItems.reduce((sum, item) => sum + item.price, 0)
		return rebadazzle({
			...cart,
			items: updatedItems,
			subtotal: newSubtotal,
		})
	},
})

const withDiscount = (cart, rebadazzle) => ({
	applyDiscount(percent) {
		const discountAmount = cart.subtotal * (percent / 100)
		return rebadazzle({
			...cart,
			discounts: discountAmount,
		})
	},
})

const withTax = (cart, rebadazzle) => ({
	calculateTax(rate) {
		const taxableAmount = cart.subtotal - cart.discounts
		return rebadazzle({
			...cart,
			tax: taxableAmount * (rate / 100),
		})
	},
})

const withShipping = (cart, rebadazzle) => ({
	setShipping(flatRate) {
		return rebadazzle({
			...cart,
			shipping: flatRate,
		})
	},
})

const withTotal = cart => ({
	get total() {
		return cart.subtotal - cart.discounts + cart.tax + cart.shipping
	},
})

// 3. Compose the decorated cart
const cart = bedazzle(
	initialCart,
	withAddItem,
	withDiscount,
	withTax,
	withShipping,
	withTotal
)

// 4. Use it with method chaining — it looks object-oriented, but each step returns a new object!
const finalCart = cart
	.addItem({ name: 'Shirt', price: 30 })
	.addItem({ name: 'Hat', price: 20 })
	.applyDiscount(10)
	.calculateTax(8)
	.setShipping(5)

console.log('Subtotal:', finalCart.subtotal) // 50
console.log('Discounts:', finalCart.discounts) // 5
console.log('Tax:', finalCart.tax) // 3.6
console.log('Shipping:', finalCart.shipping) // 5
console.log('Total:', finalCart.total) // 53.6

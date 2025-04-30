// F1 Car Setup Simulator using BedazzleJS
import { bedazzle } from '../bedazzle.js'

// Base car
const car = {
	upgrades: [],
	name: 'Base Car',
	topSpeed: 300,
	acceleration: 8,
	cornering: 6,
	tireWear: 5,
	fuelUsage: 5,
}

// Setup beads
const withSoftTires = car => ({
	upgrades: Array.from(new Set([...(car.upgrades || []), 'Soft Tires'])),

	cornering: car.cornering + 2,
	acceleration: car.acceleration - 0.3,
	tireWear: car.tireWear + 2,
})

const withHighDownforce = car => ({
	upgrades: Array.from(new Set([...(car.upgrades || []), 'High Downforce'])),
	name: car.name.includes('High Downforce')
		? car.name
		: car.name + ' + High Downforce',
	cornering: car.cornering + 3,
	topSpeed: car.topSpeed - 15,
	fuelUsage: car.fuelUsage + 1,
})

const withRaceEngine = car => ({
	upgrades: Array.from(new Set([...(car.upgrades || []), 'Race Engine'])),
	name: car.name.includes('Race Engine') ? car.name : car.name + ' + Race Engine',
	topSpeed: car.topSpeed + 20,
	acceleration: car.acceleration - 0.5,
	fuelUsage: car.fuelUsage + 2,
})

const withPitStopStrategy = car => ({
	planPitStops(laps = 50) {
		const tireLimit = Math.floor(100 / car.tireWear)
		const fuelLimit = Math.floor(100 / car.fuelUsage)
		const tireStops = Math.ceil(laps / tireLimit)
		const fuelStops = Math.ceil(laps / fuelLimit)
		return {
			laps,
			tireStops,
			fuelStops,
			totalStops: Math.max(tireStops, fuelStops),
		}
	},
})

const withLapTimeCalculator = car => ({
	estimateLapTime(track) {
		const { length, turns } = track
		const baseTime = length * 60
		const speedFactor = 300 / car.topSpeed
		const accelFactor = car.acceleration / 10
		const cornerFactor = turns / (car.cornering + 1)
		const lapTime =
			baseTime * (0.4 * speedFactor + 0.2 * accelFactor + 0.4 * cornerFactor)
		return Math.round(lapTime * 10) / 10
	},
})

const withTurboUpgrade = (car, rebedazzle) => ({
	upgradeTurbo(level = 1) {
		const speedBoost = level * 5
		const accelBoost = level * 0.2
		const fuelPenalty = level * 0.5
		return rebedazzle({
			...car,
			upgrades: Array.from(new Set([...(car.upgrades || []), `Turbo Lv${level}`])),
			topSpeed: car.topSpeed + speedBoost,
			acceleration: car.acceleration - accelBoost,
			fuelUsage: car.fuelUsage + fuelPenalty,
		})
	},
})

const withSummary = car => ({
	summary() {
		console.log(`🚗 ${car.name}`)
		if (car.upgrades?.length) {
			console.log('  Upgrades:      ' + car.upgrades.join(', '))
		}
		console.log(`  Top Speed:      ${car.topSpeed} km/h`)
		console.log(`  Acceleration:   0–100 in ${car.acceleration}s`)
		console.log(`  Cornering Grip: ${car.cornering}`)
		console.log(`  Tire Wear:      ${car.tireWear}/10`)
		console.log(`  Fuel Usage:     ${car.fuelUsage}/10`)
	},
})

// Compose the car
let myRaceCar = bedazzle(
	car,
	withSoftTires,
	withHighDownforce,
	withRaceEngine,
	withPitStopStrategy,
	withLapTimeCalculator,
	withTurboUpgrade,
	withSummary
)

// Use behavior
myRaceCar = myRaceCar.upgradeTurbo(2)
myRaceCar.summary()

const strategy = myRaceCar.planPitStops(50)
console.log('Pit strategy:', strategy)

const lapTime = myRaceCar.estimateLapTime({ length: 5.8, turns: 18 })
console.log('Estimated lap time:', lapTime, 's')

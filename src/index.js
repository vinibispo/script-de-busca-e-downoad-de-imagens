const userinput = require('./robots/user-input')
const image = require('./robots/image')
const state = require('./state')
const robots = {
userinput,
image
}
async function start() {
	let content = {}
	if (state.load()){
		content = state.load()
	}
	robots.userinput()
	await robots.image()
}

start()

const userinput = require('./robots/user-input')
const image = require('./robots/image')
const state = require('./state')
const robots = {
userinput,
image,
// text: require('./robots/sentences'),
// image: require('./robots/image'),
// wordinput: require('./robots/word-input'),
// word: require('./robots/word')
}
async function start() {
	let content = {}
	if (state.load()){
		content = state.load()
	}
	// robots.userinput()
	// await robots.text()
	await robots.image()
	// await robots.image()
	// robots.wordinput()
	// robots.word()
}

start()

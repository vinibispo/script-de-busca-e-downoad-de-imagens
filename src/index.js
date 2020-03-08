import userinput from './robots/user-input'
import google from './robots/google'
import * as state from './state'
const robots = {
userinput,
google,
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
	robots.userinput()
	// await robots.text()
	await robots.google(content)
	// await robots.image()
	// robots.wordinput()
	// robots.word()
}

start()

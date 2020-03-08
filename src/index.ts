import userinput from './robots/user-input'
import * as state from './state'
const robots = {
userinput,
// google: require('./robots/google'),
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
	robots.userinput(content)
	state.save(content)
	// await robots.text()
	// await robots.google()
	// await robots.image()
	// robots.wordinput()
	// robots.word()
}

start()

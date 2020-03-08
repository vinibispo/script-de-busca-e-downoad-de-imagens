import userinput from './robots/user-input'
const robots = {
userinput,
// google: require('./robots/google'),
// text: require('./robots/sentences'),
// image: require('./robots/image'),
// wordinput: require('./robots/word-input'),
// word: require('./robots/word')
}

async function start(content) {
	robots.userinput(content)
	// await robots.text()
	// await robots.google()
	// await robots.image()
	// robots.wordinput()
	// robots.word()
}

start()

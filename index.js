const readline  = require('readline-sync')
const state = require('../state')
robots = {
userinput: require('./robots/user-input'),
google: require('./robots/google'),
text: require('./robots/sentences'),
image: require('./robots/image')
}

async function start() {
	state.load()
	robots.userinput(content)
	await robots.text(content)
	await robots.google(content)
	await robots.image(content)
}
start()

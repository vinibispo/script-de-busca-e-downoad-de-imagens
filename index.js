const state = require('./state')
robots = {
userinput: require('./robots/user-input'),
google: require('./robots/google'),
text: require('./robots/sentences'),
image: require('./robots/image')
}

async function start() {
	// robots.userinput()
	// await robots.text()
	// await robots.google()
	await robots.image()
}

start()

const state = require('./state')
robots = {
userinput: require('./robots/user-input'),
google: require('./robots/google'),
text: require('./robots/sentences'),
image: require('./robots/image')
}

async function start() {
	// robots.userinput()
	content = state.load()
	await robots.text()
	// await robots.google(content)
	// await robots.image(content)
}

start()

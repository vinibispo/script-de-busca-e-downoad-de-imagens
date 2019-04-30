const robots = {
	google: require('./robots/google'),
	image: require('./robots/image'),
	userInput : require('./robots/user-input'),
	text: require('./robots/sentences') 
}

async function start() {
	const content = {
		maximumSentences: 10
	}
	robots.userInput(content)
        console.log('Welcome, you are on index')
	await robots.text(content)
	await robots.google(content)
	await robots.image(content)
}
start()

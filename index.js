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
	await robots.text(content)
	await robots.google(content)
	await robots.image(content)
	console.log(content)
}
start()

const robots = {
	// google: require('./robots/google'),
	// image: require('./robots/image'),
	userInput : require('./robots/user-input'),
	text: require('./robots/text') 
}

async function start() {
	const content = {
		maximumSentences: 10
	}
	robots.userInput(content)
	text = await robots.text(content)
	await text.Wiki
	// await robots.google(content)
	
	console.log(JSON.stringify(content))
}
start()

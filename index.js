const robots = {
	// google: require('./robots/google'),
 	// watson: require('./robots/watson'),
	// image: require('./robots/image'),
	userInput : require('./robots/user-input'),
	text: require('./robots/text') 
}

async function start() {
	const content = {}
	// content.amount = askAndReturnAmount()
	// content.results = await findResults()
	// content.keywords = await fetchKeywords()
	// content.img = await fetchImages()
	robots.userInput(content)
	await robots.text(content)
	console.log(content)
	/*async function findResults(content){
		content = await google(content.searchTerm, content.amount)
		return content
	}
	async function fetchKeywords(){
		sentences = await content.results.summarize
		keywords = []
		for(let sentence of sentences){
			if(typeof sentence == "object"){
				for (text of sentence){
					const keyword =await watson(text)
					console.log(keyword)
					keywords.push(keyword)
					if(keywords.length >= 20){
						break
					}
				}
			} else{
				const keyword = await watson(sentence)
				keywords.push(keyword)
				console.log(`${keyword} key`)
				if(keywords.length >= 20){
					break
				}
			}
			return keywords
		}
	}
	async function fetchImages(){
		const keywordList = await content.keywords
		const search = await content.searchTerm
		for(keywords of keywordList)
			if(typeof keywords == "object"){
				image(search, keywords)
		}
	} */
}
start()

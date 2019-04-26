const readline  = require('readline-sync')
const google = require('./google.js')
const watson = require('./watson')
const image = require('./image')

async function start() {
	const contentsearch = {}
	contentsearch.searchTerm = askAndReturnSearchTerm()
	contentsearch.amount = askAndReturnAmount()
	contentsearch.results = await findResults()
	contentsearch.keywords = await fetchKeywords()
	contentsearch.img = await fetchImages()

	function askAndReturnSearchTerm() {
		 question = readline.question('Type a search term: ')
		 return question
	}
	function askAndReturnAmount(){
		return readline.question('Type how many results do you wanna have: ')
	}
	async function findResults(){
		content = await google(contentsearch.searchTerm, contentsearch.amount)
		return content
	}
	async function fetchKeywords(){
		sentences = await contentsearch.results.summarize
		keywords = []
		for(let sentence of sentences){
			if(typeof sentence == "object"){
				for (text of sentence){
					const keyword =await watson(text)
					keywords.push(keyword)
				}
			} else{
				const keyword = await watson(sentence)
				keywords.push(keyword)
			}
			return keywords
		}
	}
	async function fetchImages(){
		const keywordList = await contentsearch.keywords
		const search = await contentsearch.searchTerm
		for(keywords of keywordList){
			if(typeof keywords == "object"){
				for(keyword of keywords){
					image(search + keyword)
				}
			} else{
				image(search + keywords)
			}
		}
	}
}
module.exports = start()

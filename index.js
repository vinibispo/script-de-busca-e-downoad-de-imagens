const readline  = require('readline-sync')
const google = require('./google.js')
const watson = require('./watson')

async function start() {
	const contentsearch = {}
	contentsearch.searchTerm = askAndReturnSearchTerm()
	contentsearch.amount = askAndReturnAmount()
	contentsearch.results = await findResults()
	contentsearch.keywords = await fetchKeywords()

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
		keywords = await watson(content.results)
		return keywords
	}
	return contentsearch

}
module.exports = start()

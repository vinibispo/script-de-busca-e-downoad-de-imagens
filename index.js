const readline  = require('readline-sync')
const google = require('./google.js')

async function start() {
	const contentsearch = {}
	contentsearch.searchTerm = askAndReturnSearchTerm()
	contentsearch.amount = askAndReturnAmount()

	function askAndReturnSearchTerm() {
	 	return readline.question('Type a search term: ')
	}
	console.log(contentsearch)
	function askAndReturnAmount(){
		return readline.question('Type how many results do you wanna have: ')
	}
	 
	 content = await google(contentsearch.searchTerm, contentsearch.amount)
	 return content
}

module.exports = start

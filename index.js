const readline  = require('readline-sync')
const google = require('./google.js')

function start() {
	const contentsearch = {}
	contentsearch.searchTerm = askAndReturnSearchTerm()

	function askAndReturnSearchTerm() {
	 	return readline.question('Type a search term: ')
	}
	console.log(contentsearch)
	 
	google(contentsearch.searchTerm)
}

start()

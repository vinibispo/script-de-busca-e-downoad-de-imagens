const readline  = require('readline-sync')
const google = require('./google.js')

async function start() {
	const contentsearch = {}
	contentsearch.searchTerm = askAndReturnSearchTerm()
	contentsearch.amount = askAndReturnAmount()
	contentsearch.results = await findResults()

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
	return contentsearch
	
	/*
	let obj = {
		fileName: 'test.docx', 
		authors: [
			'Gustavo',
			'Vinícius',
		],
		title: 'Título',
		subTitle: 'SubTítulo',
		place: 'Jundiaí',
		year: '2018',

		content: [

		]
	}

	let titulo = new word.Title('fdsafsddfasf')
	let text = new word.text('fdsafsad')

	content.push(titulo)


	word.start(obj)*/
}
module.exports = start()

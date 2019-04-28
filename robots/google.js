const google= require('googleapis').google
const Customsearch = google.customsearch('v1')
const pass = require('../credentials/package.json').googlesearch
const id = require('../credentials/package.json').searchid

async function robot(content){
	await Google(content)
}
async function Google(content){
	const answer = await Customsearch.cse.list({auth: pass, cx:id, q: content.searchTerm, num: content.amount})
	for(let i = 0; i < count; i++){
		let link = answer.data.items[i].link
		content.sentences.link.push(link)
	}
}
module.exports = robot
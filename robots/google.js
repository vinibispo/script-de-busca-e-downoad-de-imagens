const google= require('googleapis').google
const Customsearch = google.customsearch('v1')
const pass = require('../credentials/google.json').googlesearch
const id = require('../credentials/google.json').searchid

async function robot(content){
	await Google(content)
}
async function Google(content){
	Link = []
	const answer = await Customsearch.cse.list({auth: pass, cx:id, q: content.searchTerm, num: content.amount})
	for(let i = 0; i < content.amount; i++){
		let link = answer.data.items[i].link
		if (link.indexOf('wikipedia') || link.indexOf('g1') || link.indexOf('youtube')){

		}else{
			Link.push(link)
		}
	}
	content.link = Link
}
module.exports = robot
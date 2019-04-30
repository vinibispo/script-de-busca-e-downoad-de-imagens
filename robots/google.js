const google= require('googleapis').google
const Customsearch = google.customsearch('v1')
const pass = require('../credentials/google.json').googlesearch
const id = require('../credentials/google.json').searchid
const algorithmia = require('algorithmia')
const password = require('../credentials/algorithmia.json').algo

async function robot(content){
	await fetchLinksFromGoogle(content)
	await Summarize(content)
}
async function fetchLinksFromGoogle(content){
	Link = []
	const answer = await Customsearch.cse.list({auth: pass, cx:id, q: content.searchTerm, num: content.amount})
	for(let i = 0; i < content.amount; i++){
		let link = answer.data.items[i].link
		if (link.indexOf('wikipedia') > -1 || link.indexOf('g1') > -1 || link.indexOf('youtube') > -1){

		}else{
			Link.push(link)
		}
	}
	content.link = Link
}
async function Summarize(content){
	Text = []
    const algoAuthenticated = await algorithmia(password)
   const SummarizeURL = await algoAuthenticated.algo("nlp/SummarizeURL/0.1.4?timeout=300")
   for(const link of content.link){
    const SummarizeResponse = await SummarizeURL.pipe(link)
    const SummarizeContent = await SummarizeResponse.get()
    Text.push(await SummarizeContent)
   }
	content.text = Text
}
module.exports = robot
const Summarize = require('./algorithmia')
async function Google(searchterm, count){
	const google= require('googleapis').google
	const Customsearch = google.customsearch('v1')
	const pass = require('./credentials/package.json').googlesearch
	const id = require('./credentials/package.json').customid
	const answer = await Customsearch.cse.list({auth: pass, cx:id, q: searchterm, num: count})
	for(let i = 0; i < count; i++){
		let link = answer.data.items[i].link
		if (link.indexOf('wikipedia') > -1 || link.indexOf('youtube') > -1){
		} else if(link.indexOf(' ') >-1){
			link = link.replace(' ', '')
			summarizedContent = await Summarize(link)
		}else{
			summarizedContent = await Summarize(link)
		}
}
}
module.exports = Google
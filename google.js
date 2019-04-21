const Algorithmia = require('./algorithmia')
const Wikipedia = Algorithmia.wikipedia
const Summarize = Algorithmia.summarize
async function Google(searchterm, count){
	const google= require('googleapis').google
	const Customsearch = google.customsearch('v1')
	const pass = require('./credentials/package.json').googlesearch
	const id = require('./credentials/package.json').customid
	const answer = await Customsearch.cse.list({auth: pass, cx:id, q: searchterm, num: count})
	SummarizedList = []
	LinkList = []
	List = {}
	
	for(let i = 0; i < count; i++){
		let link = answer.data.items[i].link
		if (link.indexOf('wikipedia') > -1){
			const wiki = await Wikipedia(searchterm)
			SummarizedList.push(wiki)
			LinkList.push(link)
		}else if (link.indexOf('youtube') > -1 || link.indexOf('g1') > -1){
		}else{
			const summarizedContent = await Summarize(link)
			if (summarizedContent.length != 0){
				SummarizedList.push(summarizedContent)
				LinkList.push(link)
			}
		}
	}
	List.summarize = SummarizedList
	List.link = LinkList
	return List
}
module.exports = Google
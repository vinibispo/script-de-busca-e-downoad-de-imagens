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
	List = []
	for(let i = 0; i < count; i++){
		let link = answer.data.items[i].link
		if (link.indexOf('wikipedia') > -1){
			const wiki = await Wikipedia(link)
		} else if(link.indexOf(' ') >-1){
			link = link.replace(' ', '')
			const summarizedContent = await Summarize(link)
			SummarizedList.push(summarizedContent)
			LinkList.push(link)
		}else{
			const summarizedContent = await Summarize(link)
			SummarizedList.push(summarizedContent)
			LinkList.push(link)
		}
	}
	List.push(LinkList)
	List.push(SummarizedList)
	return List
}
module.exports = Google
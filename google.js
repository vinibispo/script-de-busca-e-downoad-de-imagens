/*function search(search){
	let google = require('google')
	let Algorithmia = require('./algorithmia')
	 
	google.resultsPerPage = 1
	let nextCounter = 0
	 
	google(search, function (err, res){
	  if (err) console.error(err)
	 
	  for (let i = 0; i < res.links.length; ++i) {
		let link = res.links[i]
		Algorithmia(link.href)
		
	  }
	 
	  if (nextCounter < 4) {
		nextCounter += 1
		if (res.next) res.next()
	  }
	})
}
module.exports = search*/
const Google = require('googleapis').customsearch_v1.Customsearch
const pass = require('./credentials/package.json').googlesearch
const google = new Google()
console.log(Object.getOwnPropertyNames(google))

function search(search){
	let google = require('google')
	let Algorithmia = require('./algorithmia')
	 
	google.resultsPerPage = 1
	let nextCounter = 0
	 
	google(search, function (err, res){
	  if (err) console.error(err)
	 
	  for (let i = 0; i < res.links.length; ++i) {
		let link = res.links[i]
		console.log(link.title + ' - ' + link.href)
		
	  }
	 
	  if (nextCounter < 4) {
		nextCounter += 1
		if (res.next) res.next()
	  }
	})
}
module.exports = search


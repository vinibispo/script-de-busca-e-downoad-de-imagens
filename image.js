async function getListImages(searchterm){
    const google= require('googleapis').google
	const Customsearch = google.customsearch('v1')
	const pass = require('./credentials/package.json').googlesearch
	const id = require('./credentials/package.json').imgsearch
    const answer = await Customsearch.cse.list({auth: pass, cx:id, q: searchterm, num: 2})
    console.dir(answer)
}
async function getImages(searchterm){
    const getImages = await getListImages(searchterm)
    console.log(getImages)
}
getListImages('bolo de cenoura')

module.exports = getImages
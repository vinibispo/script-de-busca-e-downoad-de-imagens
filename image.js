async function getListImages(searchterm){
    const google= require('googleapis').google
	const Customsearch = google.customsearch('v1')
	const pass = require('./credentials/package.json').googlesearch
	const id = require('./credentials/package.json').imgsearch
    const response = await Customsearch.cse.list({auth: pass, cx:id, q: searchterm, num: 2,searchType:'image', imgSize:'huge'})
    const imgURL = response.data.items.map((items) =>{
        return items.link
    })
    console.log(imgURL)
}
async function getImages(searchterm){
    const getImages = await getListImages(searchterm)
    console.dir(getImages, {depth: null})
}

module.exports = getListImages
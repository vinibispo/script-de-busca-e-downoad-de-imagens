async function getImages(searchterm){
    const google= require('googleapis').google
	const Customsearch = google.customsearch('v1')
	const pass = require('./credentials/package.json').googlesearch
	const id = require('./credentials/package.json').imgsearch
    const response = await Customsearch.cse.list({auth: pass, cx:id, q: searchterm, num: 2,searchType:'image', imgSize:'huge'})
    const imgURL = response.data.items.map((items) =>{
        return items.link
    })
    return imgURL
}
async function downloadImage(searchterm){
    imageURL = await getImages()
    for (images of imageURL){
        if(typeof images == "object"){
            for (img of images){
                file = {
                    url: img,
                    dest: '/img/'
                }
                const {filename, image} = await download.image(file)
                console.log('File saved')
            }
        }
    }
}
downloadImage()
module.exports = getImages
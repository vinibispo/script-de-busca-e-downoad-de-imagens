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
    imageURL = await getImages(searchterm)
    for (images of imageURL){
        if(typeof images == "object"){
            for (img of images){
                try {
                    const {filename, image} = await download.image({
                        url: img,
                        dest: './img/' + filename
                    })
                    console.log('File saved')
                    break   
                } catch (e) {
                    console.log('erro ao baixar')
                }
            }
        } else{
            try {
                await downloadAndSave(searchterm, images)
                console.log('File saved')
            } catch (e) {
                console.log('erro ao baixar')
            }
        }
    }
}
async function downloadAndSave(filename, url){
    const download = require('image-downloader')
    return download.image(filename, url)

}
downloadImage('Bethoven')
module.exports = getImages
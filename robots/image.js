async function getImages(searchterm){
    const google= require('googleapis').google
	const Customsearch = google.customsearch('v1')
	const pass = require('./credentials/package.json').googlesearch
	const id = require('./credentials/package.json').imgsearch
    const response = await Customsearch.cse.list({auth: pass, cx:id, q: searchterm, num: 1,searchType:'image', imgSize:'huge'})
    const imgURL = response.data.items.map((items) =>{
        return items.link
    })
    return imgURL
}
async function downloadAllImage(searchterm, keywords){
    imageURL = await getImages(searchterm)
    let i = 0
    imageList = []
   for (image of imageURL){
            for(keyword of keywords){
                if(typeof keyword == 'object'){
                    for(key of keyword){
                        try {
                            if(imageList.includes(image)){
                                throw new Error('Imagem já baixada')
                            }
                            await downloadAndSave(searchterm, key, image)
                            console.log(`file saved in ${searchterm} ${key}`)
                            imageList.push(image)
                            break
                        } catch (error) {
                            console.log(`erro ao baixar ${searchterm} ${key} there a error ${error}`)
                        }
                    }
                }
                else{
                    try {
                        if(imageList.includes(image)){
                            throw new Error('Imagem baixada anteriormente')
                        }
                        await downloadAndSave(searchterm, keyword, image)
                        console.log(`file saved in ${searchterm} ${keyword}`)
                        break
                    } catch (error) {
                        console.log(`erro ao baixar ${searchterm} ${key} there a error ${error}`)
                    }
                }
            }
        }
    // console.log(`${imageURL} and ${Object.getOwnPropertyNames(imageURL)}`)
}
async function downloadAndSave(filename, keyword, url){
    const download = require('image-downloader')
    return download.image({
        dest:`img/${filename} ${keyword}.jpg`,
        url: url})

}
// downloadAllImage('Albert Einstein', ['bomba', 'relatividade'])
module.exports = downloadAllImage
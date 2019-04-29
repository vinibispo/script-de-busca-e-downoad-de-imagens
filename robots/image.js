const google= require('googleapis').google
const Customsearch = google.customsearch('v1')
const pass = require('./credentials/google.json').googlesearch
const id = require('./credentials/google.json').imgsearch

async function robot(content){
    await downloadAllImage(content)
}

async function getImages(content){
    const response = await Customsearch.cse.list({auth: pass, cx:id, q: content.searchTerm, num: 1,searchType:'image', imgSize:'huge'})
    const imgURL = response.data.items.map((items) =>{
        return items.link
    })
    return imgURL
}
async function downloadAllImage(content){
    imageURL = await getImages(content)
    imageList = []
   for (image of imageURL){
            for(keyword of keywords){
                if(typeof keyword == 'object'){
                    for(key of keyword){
                        try {
                            if(imageList.includes(image)){
                                throw new Error('Imagem já baixada')
                            }
                            await downloadAndSave(content)
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
                        await downloadAndSave(content)
                        console.log(`file saved in ${content.searchterm} ${content.keyword}`)
                        break
                    } catch (error) {
                        console.log(`erro ao baixar ${searchterm} ${key} there a error ${error}`)
                    }
                }
            }
        }
    // console.log(`${imageURL} and ${Object.getOwnPropertyNames(imageURL)}`)
}
async function downloadAndSave(content){
    const download = require('image-downloader')
    return download.image({
        dest:`img/${content.searchTerm} ${content.sentences.keywords}.jpg`,
        url: content})

}
// downloadAllImage('Albert Einstein', ['bomba', 'relatividade'])
module.exports = downloadAllImage
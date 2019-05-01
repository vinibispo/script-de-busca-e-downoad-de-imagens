const google= require('googleapis').google
const Customsearch = google.customsearch('v1')
const pass = require('../credentials/google.json').googlesearch
const id = require('../credentials/google.json').imgsearch
const state = require('../state')
async function robot(content){
    state.load()
    await fetchImagesFromAllSentences(content)
    await downloadAllImages(content)
    await resizeAllImages(content)
    state.save(content)
}

async function fetchImagesFromAllSentences(content){
    for(const sentences of content.sentences){
        const query = `${content.searchTerm} ${sentences.keywords[0]}`
        sentences.image = await fetchLinksFromGoogleImages(query)
    }
}

async function fetchLinksFromGoogleImages(query){
    const response = await Customsearch.cse.list({auth: pass, cx:id, q: query, num: 2,searchType:'image', imgSize:'huge'})
    const imgURL = response.data.items.map((items) =>{
        return items.link
    })
    return imgURL
}

async function downloadAllImages(content){
    content.downloadedImages = []
    for(let sentencesIndex = 0; sentencesIndex< content.sentences.length; sentencesIndex++){
    const images = content.sentences[sentencesIndex].image
    for(let imageIndex = 0; imageIndex < images.length; imageIndex++){
        const imageURL = images[imageIndex]
        try {
            if (content.downloadedImages.includes(imageURL)) {
                throw new Error('Imagem já baixada')
            }
            await downloadAndSave(imageURL, `${sentencesIndex}-original.jpg`)
            content.downloadedImages.push(imageURL)
            break
        } catch (error) {
            console.log('Erro ao baixar! ' + error)
        }
    }
    }
}

async function downloadAndSave(url, filename){
    const download = require('image-downloader')
    return download.image({
        dest:`./img/${filename}`,
        url: url})
}

async function resizeAllImages(content){

}

module.exports = robot
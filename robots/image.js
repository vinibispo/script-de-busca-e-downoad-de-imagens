const gm = require('gm').subClass({imageMagick: true})
const fs = require('fs')
const google= require('googleapis').google
const Customsearch = google.customsearch('v1')
const pass = require('../credentials/google.json').googlesearch
const id = require('../credentials/google.json').imgsearch
const state = require('./state')

async function robot(){
    content = state.load()
    await fetchImagesFromAllSentences(content)
    state.save(content)
    content = state.load()
    await downloadAllImages(content)
    state.save(content)
    await convertAllImages(content)
}

async function fetchImagesFromAllSentences(content){
    for(const sentences of content.sentences){
        const query = `${content.searchTerm} ${sentences.keywords[0]}`
        sentences.images = await fetchLinksFromGoogleImages(query)
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
    const images = content.sentences[sentencesIndex].images
    for(let imageIndex = 0; imageIndex < images.length; imageIndex++){
        const imageURL = images[imageIndex]
        try {
            if (content.downloadedImages.includes(imageURL)) {
                throw new Error('Imagem já baixada')
            }
            if(content.downloadedImages.includes('https://image.isu.pub/180514010147-be2f87c457301d609f0886bed8b5366b/jpg')){
                throw new Error('Imagem errada')
            }
            await downloadAndSave(imageURL, `${sentencesIndex}.jpg`)
            content.downloadedImages.push(imageURL)
            console.log(`> [image-robot] ${sentencesIndex} baixada com sucesso`)
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
        dest:`./img/original/${filename}`,
        url: url})
}

async function convertAllImages(content){
    for (let sentenceIndex = 0; sentenceIndex < content.sentences.length; sentenceIndex++) {
        await convertImage(sentenceIndex)
    }
}

async function convertImage(sentenceIndex){
    return new Promise((resolve, reject) => {
        const inputFile = `./img/original/${sentenceIndex}.jpg`
        const outputFile = `./img/converted/${sentenceIndex}.png`
        const width = 1920
        const height = 1080
  
        gm()
          .in(inputFile)
          .out('(')
            .out('-clone')
            .out('0')
            .out('-background', 'white')
            .out('-blur', '0x9')
            .out('-resize', `${width}x${height}^`)
          .out(')')
          .out('(')
            .out('-clone')
            .out('0')
            .out('-background', 'white')
            .out('-resize', `${width}x${height}`)
          .out(')')
          .out('-delete', '0')
          .out('-gravity', 'center')
          .out('-compose', 'over')
          .out('-composite')
          .out('-extent', `${width}x${height}`)
          .write(outputFile, (error) => {
            if (error) {
              return reject(error)
            }
  
            console.log(`> [image-robot] Image converted: ${sentenceIndex}`)
            resolve()
          })
  
      })
}
module.exports = robot
const dotenv = require('dotenv')
const gm = require('gm').subClass({
    imageMagick: true
})
const state = require('../state')
dotenv.config({path: '.env'})
const {google } = require( 'googleapis')
const Google = google.customsearch('v1')
const robot = async() =>{
    console.log('[image-robot] starting image robot')
    const content = state.load()
    const fetchLinksFromGoogle = async(content) =>{
        console.log('[image-robot] getting links from image')
        const url = []
        const answer = await Google.cse.list({key: process.env.GOOGLE_PASS, q:content.term, cx: process.env.GOOGLE_ID, num: content.amount, searchType: 'image'})
        answer.data.items.map(item => { 
            console.log(`[image-robot] getting link ${item.link}`)
            url.push(item.link)})
            return url
    }
    const downloadImageFromLink = async(content) =>{
        const urlDownload = []
        const downloadAndSave = async(url, content, index) =>{
            const download = require('image-downloader')
            return await download.image({
                dest: `./img/original/${content.term}${index}.jpg`,
                url: `${url}`
            })
        }
       for(let i = 0; i < content.url.length; i++){
           const link = content.url[i]
            console.log(`[image-robot] downloading image ${link}`)
            if(urlDownload.includes(link)){
                console.log(`[image-robot] image already downloaded`)
            }
            else{
            await downloadAndSave(link, content, i)
            console.log('=========')
            console.log(link)
            console.log('==========')
            console.log(`[image-robot] downloaded image ${link}`)
            urlDownload.push(link)
            }
        }
        console.log('================')
        console.log(urlDownload)
           return urlDownload
        }
          
        const convertAllImages = async(content) =>{
            const convertImage = async(item, index) =>{
                console.log(`[image-robot] converting image ${content.term}${index}.jpg`)
                const inputFile = `./img/original/${content.term}${index}.jpg`
                const outputFile = `./img/converted/${content.term}${index}.png`
                const width = 1920
                const height = 1080
                await gm().in(inputFile).out('(').out('-clone')
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
                 console.log(`[image-robot] Editing image failed with error ${error}`)
            }
        })
        console.log(`[image-robot] image converted successfully`)
            }
            content.urlDownload.map((item, index) =>{
                convertImage(item, index)
            })
        }
    content.url =  await fetchLinksFromGoogle(content)
    content.urlDownload = await downloadImageFromLink(content)
    await convertAllImages(content)
    state.save(content)
}
module.exports = robot
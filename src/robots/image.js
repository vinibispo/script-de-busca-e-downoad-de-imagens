const dotenv = require('dotenv')
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
        const downloadAndSave = async(url, content, index) =>{
            const download = require('image-downloader')
            return await download.image({
                dest: `./img/original/${content.term}${index}.jpg`,
                url: `${url}`
            })
        }
        const urlDownload = []
        content.url.map(async(link, index) =>{
            console.log(`[image-robot] downloading image ${link}`)
            if(urlDownload.includes(link)){
                console.log(`[image-robot] image already downloaded`)
            }
            else{
            await downloadAndSave(link, content, index)
            console.log(`[image-robot] downloaded image ${link}`)
            urlDownload.push(link)
            }
        })
        return urlDownload
    }
    content.url =  await fetchLinksFromGoogle(content)
    content.urlDownload = await downloadImageFromLink(content)
    state.save(content)
}
module.exports = robot
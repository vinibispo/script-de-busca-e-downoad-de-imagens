const dotenv = require('dotenv')
const state = require('../state')
dotenv.config({path: '.env'})
const {google } = require( 'googleapis')
const Google = google.customsearch('v1')
const robot = async() =>{
    const content = state.load()
    const fetchLinksFromGoogle = async(content) =>{
        url = []
        const answer = await Google.cse.list({key: process.env.GOOGLE_PASS, q:content.term, cx: process.env.GOOGLE_ID, num: content.amount, searchType: 'image', imgSize: 'huge'})
        for(let i = 0; i < content.amount; i++){
            url.push(answer.data.items[i].link)
        } 
        return url
    }
    content.url =  await fetchLinksFromGoogle(content)
}
module.exports = robot
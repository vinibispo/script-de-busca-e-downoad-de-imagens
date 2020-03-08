import dotenv from 'dotenv'
dotenv.config({path: '.env'})
import {google } from 'googleapis'
const Google = google.customsearch('v1')
const robot = async(content) =>{
    const fetchLinksFromGoogle = async(content) =>{
        const answer = await Google.cse.list({auth: process.env.GOOGLE_PASS, q:content.term, cx: process.env.GOOGLE_ID, num: content.amount})
        for(let i = 0; i < content.amount; i++){
            console.log(answer.data.items[i].link)
        } 
    }
    await fetchLinksFromGoogle(content)
}
export default robot
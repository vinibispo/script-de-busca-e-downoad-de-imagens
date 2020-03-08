import 'dotenv'
import {google } from 'googleapis'
const Google = google.customsearch('v1')

const robot = async(content: any) =>{
    const fetchLinksFromGoogle = async(content: any) =>{
        const answer = await Google.cse.list({auth: process.env.GOOGLE_PASS, q:content.term, cx: process.env.GOOGLE_ID})
        console.log(JSON.stringify(answer))
    }
    await fetchLinksFromGoogle(content)
}
export default robot
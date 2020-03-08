import {google } from 'googleapis'
const Google = google.customsearch('v1')

const robot = async(content: any) =>{
    const fetchLinksFromGoogle = (content) =>{
        const answer = await Google.cse.list({auth: process.env.GOOGLE_PASS, cx: process.env.GOOGLE_ID})
    }
    await fetchLinksFromGoogle(content)
}
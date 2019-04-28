const algorithmia = require('algorithmia');
const pass = require('../credentials/package.json').algo
const sourceBoundaryDetection = require('sbd')
async function robot(content){
    const obj = {
        Wiki: await Wikipedia(content),
        // Summarize: await Summarize(content)
    }
    return obj
}
// async function Summarize(content){
//     const algoAuthenticated = await algorithmia(pass)
//    const SummarizeURL = await algoAuthenticated.algo("nlp/SummarizeURL/0.1.4?timeout=300") // timeout is optional
//     const SummarizeResponse = await SummarizeURL.pipe(content.sentences.link)
//     const SummarizeContent = await SummarizeResponse.get()
//     return SummarizeContent
// }
async function fetchContentFromWikipedia(content){
    const AlgoAuthenticated = await algorithmia(pass)
    const wikipediaAlgorithm = await AlgoAuthenticated.algo('web/WikipediaParser/0.1.2?timeout=300')
    const wikipediaResponse = await wikipediaAlgorithm.pipe(content.searchTerm)
    const wikipediaContent = await wikipediaResponse.get()
    content.sourceContentOriginal = wikipediaContent.content
}
// async function Wikipedia(content){
//     return sanitizeContent(await fetchContentFromWikipedia(content))
// }
function sanitizeContent(content){
    withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(content.sourceContentOriginal)
    content.sourceContentSanitized = withoutBlankLinesAndMarkdown
}
function removeBlankLinesAndMarkdown(text){
    const allLines = text.split('\n')
    const withoutBlankLinesAndMarkdown = allLines.filter((line) =>{
        if (line.trim().length === 0 || line.trim().startsWith('=')){
            return false
        }
        return true
    })
    return withoutBlankLinesAndMarkdown.join(' ')
}
function breakIntoSentences(content){
    content.sentences = []
    const sentences = sourceBoundaryDetection.sentences(content.sourceContentSanitized)
    sentences.forEach((sentence) =>{
        content.sentences.push({
            text: sentence,
            keywords: [],
            images: [],
            link: []
        })
    })
    
}
async function Wikipedia(content){
    await fetchContentFromWikipedia(content)
    sanitizeContent(content)
    breakIntoSentences(content)
}
// const Algorithmia = {
//     summarize: Summarize,
//     wikipedia: Wikipedia
// }
module.exports = robot
const algorithmia = require('algorithmia');
const pass = require('./credentials/package.json').algo
async function Summarize(link){
    const algoAuthenticated = await algorithmia(pass)
   const SummarizeURL = await algoAuthenticated.algo("nlp/SummarizeURL/0.1.4?timeout=300") // timeout is optional
    const SummarizeResponse = await SummarizeURL.pipe(link)
    const SummarizeContent = await SummarizeResponse.get()
    return SummarizeContent
}
async function fetchContentFromWikipedia(content){
    const AlgoAuthenticated = await algorithmia(pass)
    const wikipediaAlgorithm = await AlgoAuthenticated.algo('web/WikipediaParser/0.1.2?timeout=300')
    const wikipediaResponse = await wikipediaAlgorithm.pipe(content)
    const wikipediaContent = await wikipediaResponse.get()
    return wikipediaContent.content
}
async function Wikipedia(content){
    return sanitizeContent(await fetchContentFromWikipedia(content))
}
function sanitizeContent(content){
    const withoutBlank = removeBlankLines(content)
    const withoutMarkdown = removeMarkdown(withoutBlank)
    return withoutMarkdown
}
function removeBlankLines(text){
    const allLines = text.split('\n')
    const withoutBlankLines = allLines.filter((line) =>{
        if (line.trim().length === 0){
            return false
        }
        return true
    })
    return withoutBlankLines
}
function removeMarkdown(lines){
    const withoutMarkdown = lines.filter((line) =>{
        if(line.trim().startsWith("=")){
            return false
        }
        return true
    })
    return withoutMarkdown
}
const Algorithmia = {
    summarize: Summarize,
    wikipedia: Wikipedia
}
module.exports = Algorithmia
const algorithmia = require('algorithmia');
const pass = require('./credentials/package.json').algo
async function Summarize(link){
    const algoAuthenticated = await algorithmia(pass)
   const SummarizeURL = await algoAuthenticated.algo("nlp/SummarizeURL/0.1.4?timeout=300") // timeout is optional
    const SummarizeResponse = await SummarizeURL.pipe(link)
    const SummarizeContent = await SummarizeResponse.get()
    return SummarizeContent
}
async function fetchContentFromWikipedia(link){
    const AlgoAuthenticated = await algorithmia(pass)
    const wikipediaAlgorithm = await AlgoAuthenticated.algo('web/WikipediaParser/0.1.2?timeout=300')
    const wikipediaResponse = await wikipediaAlgorithm.pipe()
    const wikipediaContent = await wikipediaResponse.get()
    return wikipediaContent
}
const Algorithmia = {
    summarize: Summarize,
    wikipedia: fetchContentFromWikipedia
}
module.exports = Algorithmia
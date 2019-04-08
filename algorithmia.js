const algorithmia = require('algorithmia');
const pass = require('./credentials/package.json').algo
//const google = require('./google')
async function Summarize(link){
    console.log(link)
    const algoAuthenticated = await algorithmia(pass)
   const SummarizeURL = await algoAuthenticated.algo("nlp/SummarizeURL/0.1.4?timeout=300") // timeout is optional
    const SummarizeResponse = await SummarizeURL.pipe(link)
    const SummarizeContent = await SummarizeResponse.get()
    return SummarizeContent
}
module.exports = Summarize
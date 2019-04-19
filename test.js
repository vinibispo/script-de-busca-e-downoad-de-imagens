const algorithmia = require('algorithmia')
const pass = require('./credentials/package.json').algo
const content = {
    search : 'Albert Einstein',
}
async function fetchContentFromWikipedia(content){
    const AlgoAuthenticated = await algorithmia(pass)
    const wikipediaAlgorithm = await AlgoAuthenticated.algo('web/WikipediaParser/0.1.2?timeout=300')
    const wikipediaResponse = await wikipediaAlgorithm.pipe(content.search)
    const wikipediaContent = await wikipediaResponse.get()
    content.original = wikipediaContent.content
}
async function start(){
    await fetchContentFromWikipedia(content)
    sanitizeContent(content)
}
function sanitizeContent(content){
    const withoutBlank = removeBlankLines(content.original)
    const withoutMarkdown = removeMarkdown(withoutBlank)
    console.log(withoutMarkdown)
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
        if(line.trim.startsWith("=")){
            return false
        }
        return true
    })
    return withoutMarkdown
}
start()
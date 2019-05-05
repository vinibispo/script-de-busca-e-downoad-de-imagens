const state = require('./state')
function robot() {
    content = state.load()
    createWord(content)
}
function createWord(content){
    const Word = require('../createWord')
    let obj = {
      fileName: `${content.searchTerm}.docx`,
      authors: content.authors,
      title: content.title,
      subTitle: content.subtitle,
      place: content.place,
      year: content.year,
      falsoResumo: content.falsoresumo,
      resumo: content.resumo,
    
      content: content.text,
    }
    const word = new Word.Word(obj)
    word.createFile()
}

module.exports = robot
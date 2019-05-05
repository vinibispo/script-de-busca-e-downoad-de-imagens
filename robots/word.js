const state = require('./state')
function robot() {
    content = state.load()
    createWord(content)
}
function createWord(content){
    const Word = require('../createWord')
    const obj = {
      fileName : './'+content.searchTerm + '.docx',
      authors: content.authors,
      title: content.title,
      subTitle: content.subtitle,
      place: content.place,
      year: content.year,
      falsoresumo:'aaaaaaaaa',
      resumo: content.resumo
    }
    const word = new Word.Word(obj)
    word.createFile()
}

module.exports = robot
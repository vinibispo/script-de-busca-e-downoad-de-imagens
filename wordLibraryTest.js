let createWord = require('./wordLibrary')

let obj = {
  fileName: 'test.docx',
  authors: [
    'Gustavo',
    'Vinícius',
  ],
  title: 'Título',
  subTitle: 'SubTítulo',
  place: 'Jundiaí',
  year: '2018',

  content: [

  ],
}

let word = new createWord.Word(obj)

word.addTitle('I am a title')
word.addParagraph('I am a paragraph')
word.addParagraph('I am another paragraph')
word.addTitle('I am the last title')

word.createFile()

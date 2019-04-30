let createWord = require('./createWord')

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
  falsoResumo: 'Eu sou o falso resumo',
  resumo: 'Eu sou o verdadeiro resumo',

  content: [

  ],
}


let word = new createWord.Word(obj)


word.createFile()

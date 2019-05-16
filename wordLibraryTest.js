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
  introduction: 'I am the fucking introduction MOTHERFUCKER!!!',
  conclusion: 'I am the fucking conclusion nasty BITCH!!!',

  content: [
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
  ],
}


let word = new createWord.Word(obj)


word.createFile()

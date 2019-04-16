const date = new Date()
const word = require('./createWord')
const read = require('readline-sync')
name = read.question('Type the name of the file: ')
const obj = {
    authors: [
        'Gustavo',
        'Vinícius',
      ],
      title: 'Título',
      subTitle: 'SubTítulo',
      place: 'Jundiaí',
      year: date.getFullYear(),
}
obj.fileName = name + '.docx'
word.start(obj)
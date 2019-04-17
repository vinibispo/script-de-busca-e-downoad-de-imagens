const date = new Date()
const word = require('./createWord')
const read = require('readline-sync')
async function Index(){
  content = await require('./index')
  return content
}
async function nameofFile(){
  content = await Index()
  name = content.searchTerm
  return name
}
async function getAllContent(){
  content = await Index()
  cont = content.results
  return cont
}
async function getAuthors(){
  amount = read.question('Type how many authors that has: ')
  authors = []
  for(let i = 0; i< amount; i++){
    author = read.question('Type the name of author: ')
    authors.push(author)
  }
  return authors
}/*
async function createWord(){
  const obj = {
    authors: await getAuthors(),
      fileName : await nameofFile() + '.docx',
      title: 'Título',
      subTitle: 'SubTítulo',
      place: 'Jundiaí',
      year: date.getFullYear()
}
word.start(obj)
}
createWord()*/
async function start(){
  console.log(await getAllContent())
}
start()
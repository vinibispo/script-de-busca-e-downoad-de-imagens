function getYear(){
  const date = new Date()
  return date.getFullYear()
}
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
}
function getTitle(){
  title = read.question("Type the title: ")
  return title
}
function getSubtitle(){
  subtitle = read.question("Type the subtitle: ")
  return subtitle
}
function getPlace(){
  place = read.question("Type the place: ")
  return place
}
async function createWord(){
  const obj = {
    authors: await getAuthors(),
      fileName : await nameofFile() + '.docx',
      title: getTitle(),
      subTitle: getSubtitle(),
      place: getPlace(),
      year: getYear()
}
word.start(obj)
}
createWord()
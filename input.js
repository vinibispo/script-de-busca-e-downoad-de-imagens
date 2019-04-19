let Word = require('./createWord')
const read = require('readline-sync')

function getYear(){
  const date = new Date()
  return date.getFullYear()
}
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
  contentall = content.results
  contentList = contentall.summarize
  return contentList
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
    year: getYear(),
  }
  let word = new Word.Word(obj)
  for (content of await Paragraphing()){
    word.addParagraph(content)
  }

  word.createFile()
  console.log(Object.getOwnPropertyNames(word))
}
createWord()

async function Paragraphing(){
  list = []
  contentList = await getAllContent()
 for (content of contentList){
   list.push(content)
 }
 return list
}

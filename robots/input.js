const state = require('./state')
const word = require('./createWord')
const read = require('readline-sync')
function robot(){
    content = state.load()
    getYear(content)
    state.save(content)
    content = state.load()
    getTitle(content)
    state.save(content)
    content = state.load()
    getSubtitle(content)
    state.save(content)
    content = state.load()
    getPlace(content)
    state.save(content)
    state.save(content)
}
function getYear(content){
  const date = new Date()
  yeardate = date.getFullYear()
  content.year = yeardate
}
// async function nameofFile(){
//   content = await Index()
//   name = content.searchTerm
//   return name
// }
// async function getAllContent(){
//   content = await Index()
//   contentall = content.results
//   contentList = contentall.summarize
//   return contentList
// }
// async function getAuthors(){
//   amount = read.question('Type how many authors that has: ')
//   authors = []
//   for(let i = 0; i< amount; i++){
//     author = read.question('Type the name of author: ')
//     authors.push(author)
//   }
//   return authors
// }
function getTitle(content){
  title = read.question("Type the title: ")
  content.title = title
}
function getSubtitle(content){
  subtitle = read.question("Type the subtitle: ")
  content.subtitle = subtitle
}
function getPlace(content){
  place = read.question("Type the place: ")
  content.place = place
}
// async function createWord(){
//   const obj = {
//     authors: content.authors,
//     fileName : content.searchTerm + '.docx',
//     title: content.title,
//     subTitle: content.subTitle,
//     place: content.place,
//     year: content.year,
//   }
//   let word = new word.Word(obj)
//   for (content of await Paragraphing()){
//     word.addParagraph(content)
//   }

//   word.createFile()
// }
// createWord()

// state.save(content)
module.exports = robot
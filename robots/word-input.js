const state = require('./state')
const read = require('readline-sync')
function robot(){
    content = state.load()
    getAuthors(content)
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
    getSummary(content)
    state.save(content)
    content = state.load()
    getFakeSummary(content)
    state.save(content)
}
function getSummary(content) {
  kindOfWork = getWork()
  getCourse()
  getSubjects()
  getTeachers()
  resumo = `${content.course} and ${content.subjects} and ${content.teachers}`
  content.resumo = resumo
}

function getFakeSummary(content) {
  kindOfWork = getWork()
  course = content.course
  subjects = content.subjects
  teachers = content.falsoresumo
  resumo = `${course} or ${subjects} and ${teachers}`
  content.falsoresumo = resumo
}

function getWork() {
  list = ['Monografia', 'Trabalho de Conclusão de Curso']
}

function getCourse() {
  content.course = read.question('Digite o curso: ')
}

function getSubjects() {
  list = []
  num = read.question('Digite quantas matérias são: ')
  for (let index = 0; index < num; index++) {
    const subject = read.question('Digite o nome de uma: ')
    list.push(subject)    
  }
  content.subjects = list
}

function getTeachers() {
    list = []
  num = read.question('Digite quantos professores são: ')
  for (let index = 0; index < num; index++) {
    const teacher = read.question('Digite o nome de um: ')
    list.push(teacher)    
  }
  content.teachers = list
}

function getAuthors(content) {
  authorList = []
  num = read.question('Type how many authors that has: ')
  for (indexOfAuthors = 0; indexOfAuthors < num; indexOfAuthors++){
    author = read.question('Type an author: ')
    authorList.push(author)
  }
  content.authors = authorList
}

function getYear(content){
  const date = new Date()
  yeardate = date.getFullYear()
  content.year = yeardate
}

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

// state.save(content)
module.exports = robot
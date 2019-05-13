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
    getIntroduction(content)
    state.save(content)
    getConclusion(content)
    state.save(content)
}
function getSummary(content) {
  resumo = `Este texto mostrará a vocês, senhoras e senhores, tudo a respeito de ${content.searchTerm}`
  content.resumo = resumo
}

function getFakeSummary(content) {
  getWork()
  getCourse()
  getSubjects()
  getTeachers()
  falsoresumo = `${content.work} sobre ${content.searchTerm} referente ao curso de ${content.course} como requisito de avaliação das disciplinas de ${content.subjects}, sob orientação dos professores ${content.teachers}.`
  content.falsoresumo = falsoresumo
}

function getWork() {
  console.log('Digite o tipo de trabalho:')
  const kindOfWork = ['Monografia', 'Trabalho de Conclusão de Curso', 'Trabalho de Pesquisa']
  const selectedWork = read.keyInSelect(kindOfWork)
  content.work =kindOfWork[selectedWork]
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
function getIntroduction(content){
  introduction = `Nesse trabalho iremos tratar de ${content.searchTerm}\nVocê verá o que são e onde são encontrados.\nEstamos fazendo isso para que você, porventura deseja conhecer mais sobre ${content.searchTerm}, mas não souber onde encontrar, nós trouxemos a solução. Esperamos que você aproveite todo conhecimento que é passado e que você goste`
  content.introduction = introduction
}
function getConclusion(content){
  conclusion = `Concluímos aqui que ${content.searchTerm} é muito mais interessante do que você pensava`
  content.conclusion = conclusion
}
// state.save(content)
module.exports = robot
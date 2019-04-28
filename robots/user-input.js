function robot(content){
    const readline  = require('readline-sync')
    content.searchTerm = askAndReturnSearchTerm()
    content.amount = askAndReturnAmount()

    function askAndReturnSearchTerm() {
        question = readline.question('Type a search term: ')
        return question
   }
   function askAndReturnAmount(){
       return readline.question('Type how many results do you wanna have: ')
   }
}
module.exports = robot
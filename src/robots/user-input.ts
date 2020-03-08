import read from 'readline-sync'
const robot = (content:any) =>{
console.log("[input-robot] Starting input robot")
 const askAndReturnSearchTerm = ( ) =>{
    console.log("[input-robot] Welcome to the input robot")
    const term =  read.question("What do you look for?")
    console.log(`[input-robot] Got term ${term}`)
}
const askAndReturnNumOfResults = () =>{
    const amount = read.questionInt('[input-robot] How much results do you have?')
    return amount
}
    content.term = askAndReturnSearchTerm()
    content.amount = askAndReturnNumOfResults()
}
export default robot
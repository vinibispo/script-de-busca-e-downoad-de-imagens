import read from 'readline-sync'
const robot = (content:any) =>{
console.log("[input-robot] Starting input robot")
 const askThermAndReturnSearchTherm = ( ) =>{
    console.log("[input-robot] Welcome to the input robot")
    return read.question("What do you look for?")
}
    content.therm = askThermAndReturnSearchTherm()
}
export default robot
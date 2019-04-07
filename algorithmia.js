const algorithmia = require('algorithmia');
const pass = require('./credentials/package.json').algo
//const google = require('./google')
async function Summarize(link){
    console.log(link)
    algorithmia.client(pass)
    .algo("nlp/SummarizeURL/0.1.4?timeout=300") // timeout is optional
    .pipe(link)
    .then(function(response) {
        console.log(response.get())
    });
}
module.exports = Summarize
const algorithmia = require("algorithmia");
const pass = require('./credentials/package.json').apiKey
const google = require('./google')
async function Summarize(link){
    algorithmia.client(pass)
    .algo("nlp/SummarizeURL/0.1.4?timeout=300") // timeout is optional
    .pipe(link)
    .then(function(response) {
        console.log(response.get());
    });
}
Summarize("http://techcrunch.com/2015/03/12/algorithmia-launches-with-more-than-800-algorithms-on-its-marketplace/")
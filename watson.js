const pass = require('./credentials/package.json').apikey
const url = require('./credentials/package.json').url
const text = `I'm love with someone and I don't have courage to say how I feel`
const nluv1 = require('ibm-watson/natural-language-understanding/v1')
const nlu = new nluv1({
    iam_apikey: pass,
    version: '2019-02-01',
    url: url
})

async function fetchKeywordsFromWatson(sentences){
    promise = new Promise((resolve, reject) =>{
        nlu.analyze({
            text: sentences,
            features:{
                keywords:{}
        },
    }, (err, res) => {
                if (err) {
                    throw err
                }
                const keywords = res.keywords.map((keyword) =>{
                    return keyword.text})
                resolve(keywords)
            })
    })
    return await promise
}
module.exports = fetchKeywordsFromWatson
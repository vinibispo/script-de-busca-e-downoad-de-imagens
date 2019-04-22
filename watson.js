const pass = require('./credentials/package.json').apikey
const url = require('./credentials/package.json').url
const text = `I'm love with someone and I don't have courage to say how I feel`
const nluv1 = require('watson-developer-cloud/natural-language-understanding/v1')
const nlu = new nluv1({
    iam_apikey: pass,
    version: '2019-02-01',
    url: url
})
nlu.analyze({
    text: text,
    features:{
        keywords:{}
    },
},
    (err, res) =>{
        if (err) {
            throw err
        }
        console.log(JSON.stringify(res, null, 4))
        process.exit(0)
    }
)
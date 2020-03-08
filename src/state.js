const fs = require('fs')
const conentFilePath = "./content.json"

const save = (content) =>{
    const contentString = JSON.stringify(content)
    return fs.writeFileSync(conentFilePath, contentString)
}
const load = () =>{
    try{
    const fileBuffer = fs.readFileSync(conentFilePath, 'utf-8')
    const contentJSON = JSON.parse(fileBuffer)
    return contentJSON
    }
    catch(err){
        return false
    }
}
module.exports = {
    save, load
}
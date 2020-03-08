import fs from 'fs'
const conentFilePath = "./content.json"

export const save = (content: Object) =>{
    const contentString = JSON.stringify(content)
    return fs.writeFileSync(conentFilePath, contentString)
}
export const load = (content: Object) =>{
    const fileBuffer = fs.readFileSync(conentFilePath, 'utf-8')
    const contentJSON = JSON.parse(fileBuffer)
    return contentJSON
}
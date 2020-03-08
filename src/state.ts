import fs from 'fs'
const conentFilePath = "./content.json"

export const save = (content: any) =>{
    const contentString = JSON.stringify(content)
    return fs.writeFileSync(conentFilePath, contentString)
}
export const load = () =>{
    try{
    const fileBuffer = fs.readFileSync(conentFilePath, 'utf-8')
    const contentJSON = JSON.parse(fileBuffer)
    return contentJSON
    }
    catch(err){
        return false
    }
}
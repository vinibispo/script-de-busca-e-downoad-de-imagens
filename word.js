const docx = require('docx')
const fs = require("fs")
const Summarizedcontent = require('./index')

async function start() {
	/*const doc = new docx.Document()

	const paragraph = new docx.Paragraph("Hello World")
	

	doc.addParagraph(paragraph)

	const packer = new docx.Packer()

	packer.toBuffer(doc).then((buffer) => {
		fs.writeFileSync('test.docx', buffer)
	})*/
	const list = await Summarizedcontent()
	for(contentList of list){
		for (content of contentList){
			console.log(content)
		}
	}
}

start()

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
	summarized = await Summarizedcontent()
	for(content of summarized){
	console.log(content)
	}
}

start()

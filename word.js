const docx = require('docx')
const fs = require("fs")


async function start() {
	const doc = new docx.Document()

	const paragraph = new docx.Paragraph("Hello World")
	

	doc.addParagraph(paragraph)

	const packer = new docx.Packer()

	packer.toBuffer(doc).then((buffer) => {
		fs.writeFileSync('test.docx', buffer)
	})
}

start()

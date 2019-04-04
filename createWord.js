

class word {
  constructor() {
    this.docx = require('docx')
    this.doc = new this.docx.Document()
    this.fs = require('fs')

    this.doc.Styles
      .createParagraphStyle('cover')
      .size(50) 
  }

  addParagraph(text, style) {
    this.doc.addParagraph(new this.docx.Paragraph(text).style(style))
  }

  start(parametersObj) {
    this.par = parametersObj
    this.fileTitle = this.par.title

    this.addParagraph('ETEC Vasco Antônio Venchiarutti', 'cover')

    this.create()
  }

  create() {
      new this.docx.Packer().toBuffer(this.doc).then((buffer) => {
        this.fs.writeFileSync(this.fileTitle, buffer)
    })
  }
}

new word().start({title: 'test.docx'})

module.exports = new word()


/*
  parametersObj syntax example

  parametersObj = {
    paragraphs: [
      'paragraph 1',
      'paragraph 2'
    ],
    authors: [
      'Gustavo err',
      'outra pessoa'
    ]
  }
*/


class word {
  constructor() {
    this.docx = require('docx')
    this.styles = new this.docx.Styles()
    this.doc = new this.docx.Document()
    this.fs = require('fs')

    this.styles.createParagraphStyle('normal')
      .spacing({line: 1000})
  }

  start(parametersObj) {
    this.par = parametersObj
    this.fileTitle = this.par.title

    this.doc.addParagraph(new this.docx.Paragraph().center().addRun(new this.docx.TextRun('ETEC Vasco Antônio Venchiarutti').size(24).font('Arial')))


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
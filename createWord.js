

class word {
  constructor() {
    this.docx = require('docx')
    this.doc = new this.docx.Document()
    this.fs = require('fs')
    this.paragraphStyle = 'default'

    this.doc.Styles
      .createParagraphStyle('default')
      .size(24)
      .spacing({ line: 360 }) 
      .font('Arial')
    
    this.doc.Styles
      .createParagraphStyle('cover')
      .basedOn('default')
      .allCaps()
      .center()
  }

  start(parametersObj) {
    this.par = parametersObj

    this.setParagraphStyle('cover')
    this.addParagraph('ETEC Vasco Antônio Venchiarutti')
    this.addBlanckLines(4)
    this.addAuthors()

    this.create()
  }

  create() {
      new this.docx.Packer().toBuffer(this.doc).then((buffer) => {
        this.fs.writeFileSync(this.par.title, buffer)
    })
  }

  addAuthors() {
    let arr = this.par.authors
    let length = arr.length
    for (let i=0;i<length;i++)
      this.addParagraph(arr[i])
  }

  setParagraphStyle(style) {
    this.paragraphStyle = style
  }

  addParagraph(text) {
    this.doc.addParagraph(new this.docx.Paragraph(text).style(this.paragraphStyle))
  }

  addBlanckLines(numLines) {
    for (let i=0;i<numLines;i++)
      this.addParagraph('', '')
  }

  getRun(text) {
    return new this.docx.Run(text).style(this.paragraphStyle)    
  }
}

let obj = {
  title: 'test.docx',
  authors: [
    'Gustavo',
    'Vinícius',
  ],
}

new word().start(obj)

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
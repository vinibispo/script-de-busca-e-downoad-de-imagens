

class word {
  constructor() {
    this.docx = require('docx')
    this.doc = new this.docx.Document()
    this.fs = require('fs')

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

    this.addParagraph('ETEC Vasco Antônio Venchiarutti', 'cover')

    this.create()
  }

  create() {
      new this.docx.Packer().toBuffer(this.doc).then((buffer) => {
        this.fs.writeFileSync(this.par.title, buffer)
    })
  }

  addParagraph(text, style) {
    if (style === undefined) style = 'default'
    this.doc.addParagraph(new this.docx.Paragraph(text).style(style))
  }

  addBlanckLines(numLines) {
    for (let i=0;i<numLines;i++)
      this.addParagraph('', '')
  }

  getRun(text, style) {
    if (style === undefined) style = 'default'
    return new this.docx.Run(text).style(style)    
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
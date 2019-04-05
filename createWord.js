

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
      .center()
    
    this.doc.Styles
      .createParagraphStyle('coverAllCaps')
      .basedOn('cover')
      .allCaps()
    
    this.doc.Styles
      .createParagraphStyle('coverBold')
      .basedOn('cover')
      .bold()

  }

  start(parametersObj) {
    this.par = parametersObj

    this.setParagraphStyle('coverAllCaps')
    this.addParagraph('ETEC Vasco Antônio Venchiarutti')
    this.addBlanckLines(4)

    this.addAuthors()
    this.addBlanckLines(8)

    this.setParagraphStyle('coverBold')
    this.addParagraph(this.par.title)
    this.addParagraph(this.par.subTitle)
    this.addBlanckLines(15)

    this.setParagraphStyle('cover')
    this.addParagraph(this.par.place)
    this.addParagraph(this.par.year)



    this.create()
  }

  create() {
      new this.docx.Packer().toBuffer(this.doc).then((buffer) => {
        this.fs.writeFileSync(this.par.fileName, buffer)
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


// syntax example
let obj = {
  fileName: 'test.docx',
  authors: [
    'Gustavo',
    'Vinícius',
  ],
  title: 'Título',
  subTitle: 'SubTítulo',
  place: 'Jundiaí',
  year: '2018',
}

new word().start(obj)

module.exports = new word()

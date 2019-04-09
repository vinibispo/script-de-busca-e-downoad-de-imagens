
class Title {
  constructor(title_text) {
    this.txt = title_text
  }
}

class Word {
  constructor() {
    this.docx = require('docx')
    this.doc = new this.docx.Document()
    this.fs = require('fs')
    this.paragraphStyle = 'defaultParagraph'
    this.titleStyle = 'defaultTitle'

    this.doc.Styles
      .createParagraphStyle('defaultParagraph')
      .size(24)
      .spacing({ line: 360 }) 
      .font('Arial')

    this.doc.styles
      .createParagraphStyle('defaultTitle')
      .font('Arial')
      .size(32)
      .color('2e74b5')

    this.doc.Styles
      .createParagraphStyle('cover')
      .basedOn('defaultParagraph')
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

    this.addAbntPages()
    this.addContentPages()


    this.create()
  }

  create() {
      new this.docx.Packer().toBuffer(this.doc).then((buffer) => {
        this.fs.writeFileSync(this.par.fileName, buffer)
    })
  }

  addAbntPages() {
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
  }

  addContentPages() {
    let content = this.par.content
    let length = content.length
    for (let i=0;i<length;i++) {
      if (content[i].constructor.name === 'Title') {
        this.addTitle(content[i].txt)
      }
    }
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

  setTitleStyle(style) {
    this.titleStyle = style
  }

  addParagraph(text) {
    this.doc.addParagraph(new this.docx.Paragraph(text).style(this.paragraphStyle))
  }

  addTitle(text) {
    this.doc.addParagraph(new this.docx.Paragraph(text).style(this.titleStyle))
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

  content: [

  ],
}


new Word().start(obj)

module.exports = {
  Word,
  Title,
}


class Title {
  constructor(title_text) {
    this.txt = title_text
  }
}

class Word {
  constructor(params) {
    this.docx = require('docx')
    this.doc = new this.docx.Document()
    this.fs = require('fs')
    this.paragraphStyle = 'defaultParagraph'
    this.titleStyle = 'defaultTitle'
    this.par = params

    this._addAbntPages()
    this._addContentPages()
  }

  createFile() {
      new this.docx.Packer().toBuffer(this.doc).then((buffer) => {
        this.fs.writeFileSync(this.par.fileName, buffer)
    })
  }

  _setStyles() {
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
  
  _addAbntPages() {
    this._setParagraphStyle('coverAllCaps')
    this._addParagraph('ETEC Vasco Antônio Venchiarutti')
    this._addBlanckLines(4)

    this._addAuthors()
    this._addBlanckLines(8)

    this._setParagraphStyle('coverBold')
    this._addParagraph(this.par.title)
    this._addParagraph(this.par.subTitle)
    this._addBlanckLines(15)

    this._setParagraphStyle('cover')
    this._addParagraph(this.par.place)
    this._addParagraph(this.par.year)
  }

  _addContentPages() {
    let content = this.par.content
    let length = content.length
    for (let i=0;i<length;i++) {
      if (content[i].constructor.name === 'Title') {
        this._addTitle(content[i].txt)
      }
    }
  }

  _addAuthors() {
    let arr = this.par.authors
    let length = arr.length
    for (let i=0;i<length;i++)
      this._addParagraph(arr[i])
  }

  _setParagraphStyle(style) {
    this.paragraphStyle = style
  }

  _setTitleStyle(style) {
    this.titleStyle = style
  }

  _addParagraph(text) {
    this.doc.addParagraph(new this.docx.Paragraph(text).style(this.paragraphStyle))
  }

  _addTitle(text) {
    this.doc._addParagraph(new this.docx.Paragraph(text).style(this.titleStyle))
  }

  _addBlanckLines(numLines) {
    for (let i=0;i<numLines;i++)
      this._addParagraph('', '')
  }

  _getRun(text) {
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


let word = new Word(obj)


word.createFile()



module.exports = {
  Word,
  Title,
}

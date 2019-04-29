
class _Title {
  constructor(text) {
    this.txt = text
  }
}

class _Paragraph {
  constructor(text) {
    this.txt = text
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
    if (this.par.content === undefined)
      this.par.content = []

    this._addAbntPages()
    this._setStyles()
  }

  addTitle(text) {
    this.par.content.push(new _Title(text))
  }

  addParagraph(text) {
    this.par.content.push(new _Paragraph(text))
  }

  createFile() {
      this._addContentPages()
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
  
  this.doc.Styles
    .createParagraphStyle('falsoResumo')
    .basedOn('defaultParagraph')
    .justified()
    .right()

  }
  
  _addAbntPages() {
    const schoolName = 'ETEC Vasco Antônio Venchiarutti'

    this._setParagraphStyle('coverAllCaps')
    this._addParagraph(schoolName)
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
    this._setParagraphStyle('defaultParagraph')

    this._setParagraphStyle('cover')
    this._addBlanckLines(1)

    this._addParagraph(schoolName)
    this._addBlanckLines(8)

    this._addParagraph(this.par.title)
    this._addAuthors()
    this._addBlanckLines(7)

    this._setParagraphStyle('falsoResumo')
    this._addParagraph(this.par.falsoResumo)
    this._addBlanckLines(7)

    this._setParagraphStyle('defaultParagraph')
    this._addBlanckLines(1)
    this._addTitle('RESUMO')

    this._addParagraph(this.par.resumo)
  }

  _addContentPages() {
    let content = this.par.content
    let length = content.length
    for (let i=0;i<length;i++) {
      if (content[i].constructor.name === '_Title') {
        this._addTitle(content[i].txt)
      } else if (content[i].constructor.name === '_Paragraph') {
        this._addParagraph(content[i].txt)
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
    this.doc.addParagraph(new this.docx.Paragraph(text).style(this.titleStyle))
  }

  _addBlanckLines(numLines) {
    for (let i=0;i<numLines;i++)
      this._addParagraph('', '')
  }

  _getRun(text) {
    return new this.docx.Run(text).style(this.paragraphStyle)    
  }
}

module.exports = {
  Word,
  _Title,
  _Paragraph,
}

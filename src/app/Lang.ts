function initialTag(): string {
  const local = localStorage.getItem('lang')
  if (local) return local
  if (navigator.language.startsWith('zh')) return 'zh'
  return 'en'
}

export class Lang {
  _tag: string
  tags = ['zh', 'en']

  constructor() {
    this._tag = initialTag()
  }

  get tag(): string {
    return this._tag
  }

  set tag(tag: string) {
    this._tag = tag

    localStorage.setItem('lang', tag)
  }

  get zh(): boolean {
    return this.tag.startsWith('zh')
  }

  get en(): boolean {
    return !this.zh
  }

  findTagName(tag: string): string {
    switch (tag) {
      case 'zh':
        return '中文'
      case 'en':
        return 'English'
      default:
        return 'English'
    }
  }

  get tagName(): string {
    return this.findTagName(this.tag)
  }
}

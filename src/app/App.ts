import { Lang } from './Lang'

export class App {
  lang = new Lang()

  get name(): string {
    return this.lang.zh ? 'FiDB' : 'FiDB'
  }
}

import { useGlobalLang } from '../reactives/useGlobalLang'

export class App {
  get name(): string {
    const lang = useGlobalLang()

    return lang.isZh() ? 'FiDB' : 'FiDB'
  }
}

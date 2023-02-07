import { Json } from '../../utils/Json'

export class State {
  constructor(
    public url: string,
    public root: string,
    public directories: Array<string>,
    public currentDirectory?: string,
    public dataset: Array<Json> = [],
  ) {}

  static async load(options: { url: string }): Promise<State> {
    const { url } = options
    const { root, directories } = await (await fetch(`${url}`)).json()
    const currentDirectory = directories[0]
    return new State(url, root, directories, currentDirectory)
  }
}

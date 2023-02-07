export class ManagerState {
  constructor(
    public url: string,
    public root: string,
    public directories: Array<string>,
    public currentDirectory?: string,
  ) {}

  static async load(options: { url: string }): Promise<ManagerState> {
    const { url } = options
    const { root, directories } = await (await fetch(`${url}`)).json()
    const currentDirectory = directories[0]
    return new ManagerState(url, root, directories, currentDirectory)
  }
}

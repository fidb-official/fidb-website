export class ManagerState {
  constructor(
    public url: string,
    public root: string,
    public directories: Array<string>,
  ) {}

  static async load(options: { url: string }): Promise<ManagerState> {
    const { url } = options
    const { root, directories } = await (await fetch(`${url}`)).json()
    return new ManagerState(url, root, directories)
  }
}

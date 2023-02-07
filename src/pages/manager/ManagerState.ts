export class ManagerState {
  constructor(
    public url: string,
    public root: { directories: Array<string> },
  ) {}

  static async load(options: { url: string }): Promise<ManagerState> {
    const { url } = options
    const root = await (await fetch(`${url}`)).json()
    return new ManagerState(url, root)
  }
}

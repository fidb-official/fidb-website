export class ManagerState {
  constructor(public options: { url: string }) {}

  static async load(options: { url: string }): Promise<ManagerState> {
    return new ManagerState(options)
  }
}

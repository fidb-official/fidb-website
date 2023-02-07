import { State } from './State'

export async function loadState(options: { url: string }): Promise<State> {
  const { url } = options

  const { root, directories } = await (await fetch(`${url}`)).json()

  const currentDirectory = directories[0]

  const dataset: Array<any> = []

  return {
    url,
    root,
    directories,
    currentDirectory,
    dataset,
  }
}

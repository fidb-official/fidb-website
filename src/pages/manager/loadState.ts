import { createState, State } from './State'

export async function loadState(options: { url: string }): Promise<State> {
  const { url } = options
  const { root, directories } = await (await fetch(`${url}`)).json()
  return createState({ url, root, directories })
}

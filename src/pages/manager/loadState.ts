import { createState, State } from './State'

export async function loadState(options: { url: string }): Promise<State> {
  const { url } = options
  const response = await fetch(`${url}`)
  const { root, directories } = await response.json()
  return createState({ url, root, directories })
}

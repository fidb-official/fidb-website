import { useGlobalToken } from '../../reactives/useGlobalToken'
import { State } from './State'
import { stateStatusError } from './stateStatus'

export async function stateFetchFile(
  state: State,
  path: string,
): Promise<ArrayBuffer | undefined> {
  const response = await fetch(`${state.url}/${path}`, {
    method: 'GET',
    headers: {
      'content-type': 'text/plain',
      authorization: useGlobalToken().authorization,
    },
  })

  if (response.ok) {
    return await response.arrayBuffer()
  } else {
    stateStatusError(state, {
      who: 'stateFetchFile',
      message: response.statusText,
      data: { path },
    })
  }
}

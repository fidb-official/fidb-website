import { State } from './State'
import { stateHeaders } from './stateHeaders'
import { stateStatusError } from './stateStatus'

export async function stateFetchFile(
  state: State,
  path: string,
): Promise<Blob | undefined> {
  const response = await fetch(`${state.url}/${path}?kind=file`, {
    method: 'GET',
    headers: {
      ...stateHeaders(state),
    },
  })

  if (response.ok) {
    return await response.blob()
  } else {
    stateStatusError(state, {
      who: 'stateFetchFile',
      message: response.statusText,
      data: { path },
    })
  }
}

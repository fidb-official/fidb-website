import { useGlobalToken } from '../../reactives/useGlobalToken'
import { State } from './State'
import { stateStatusError } from './stateStatus'

export type FileMetadata = {
  size: number
}

export async function stateFetchFileMetadata(
  state: State,
  path: string,
): Promise<FileMetadata | undefined> {
  const response = await fetch(`${state.url}/${path}?kind=file-metadata`, {
    method: 'GET',
    headers: {
      authorization: useGlobalToken().authorization,
    },
  })

  if (response.ok) {
    return await response.json()
  } else {
    stateStatusError(state, {
      who: 'stateFetchFileMetadata',
      message: response.statusText,
      data: { path },
    })
  }
}

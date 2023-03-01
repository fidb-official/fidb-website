import { State } from './State'
import { stateHeaders } from './stateHeaders'
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
      ...stateHeaders(state),
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

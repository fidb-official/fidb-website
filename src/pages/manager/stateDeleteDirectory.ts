import { useGlobalToken } from '../../reactives/useGlobalToken'
import { State } from './State'
import { stateRemovePathEntry } from './stateRemovePathEntry'
import {
  stateStatusError,
  stateStatusOk,
  stateStatusRunning,
} from './stateStatus'

export async function stateDeleteDirectory(
  state: State,
  path: string,
): Promise<void> {
  const who = 'stateDeleteDirectory'

  stateStatusRunning(state, { who, message: 'deleting' })

  const response = await fetch(`${state.url}/${path}?kind=directory`, {
    method: 'DELETE',
    headers: {
      authorization: useGlobalToken().authorization,
    },
  })

  if (response.ok) {
    stateRemovePathEntry(state, path)
    stateStatusOk(state, {
      who,
      message: 'directory deleted',
      data: { path },
    })
  } else {
    stateStatusError(state, {
      who,
      message: response.statusText,
    })
  }
}

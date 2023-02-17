import { useGlobalToken } from '../../reactives/useGlobalToken'
import { State } from './State'
import {
  stateStatusError,
  stateStatusOk,
  stateStatusRunning,
} from './stateStatus'

export async function stateDeleteDirectory(
  state: State,
  directory: string,
): Promise<void> {
  const who = 'stateDeleteDirectory'

  stateStatusRunning(state, { who, message: 'deleting' })

  if (
    !state.pathEntries.find(
      (pathEntry) =>
        pathEntry.kind === 'Directory' && pathEntry.path === directory,
    )
  ) {
    stateStatusOk(state, {
      who,
      message: 'directory does not exist',
      data: { directory },
    })
    return
  }

  const response = await fetch(`${state.url}/${directory}?kind=directory`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      authorization: useGlobalToken().authorization,
    },
  })

  if (response.ok) {
    const index = state.pathEntries.findIndex(
      (pathEntry) =>
        pathEntry.kind === 'Directory' && pathEntry.path === directory,
    )
    if (index !== -1) {
      state.pathEntries.splice(index, 1)
    }

    if (state.currentPathEntry?.path === directory) {
      state.currentPathEntry = state.pathEntries[0]
    }

    stateStatusOk(state, {
      who,
      message: 'deleted directory',
      data: { directory },
    })
  } else {
    stateStatusError(state, {
      who,
      message: response.statusText,
    })
  }
}

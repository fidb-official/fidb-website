import { useGlobalToken } from '../../reactives/useGlobalToken'
import { createPathEntry } from './PathEntry'
import { State } from './State'
import {
  stateStatusError,
  stateStatusOk,
  stateStatusRunning,
} from './stateStatus'

export async function stateCreateDirectory(
  state: State,
  directory: string,
): Promise<void> {
  const who = 'stateCreateDirectory'

  stateStatusRunning(state, { who, message: 'creating' })

  if (
    state.pathEntries.find(
      (pathEntry) =>
        pathEntry.kind === 'Directory' && pathEntry.path === directory,
    )
  ) {
    stateStatusOk(state, {
      who,
      message: 'directory already exists',
      data: { directory },
    })
    return
  }

  const response = await fetch(`${state.url}/${directory}?kind=directory`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: useGlobalToken().authorization,
    },
  })

  if (response.ok) {
    const pathEntry = createPathEntry({
      kind: 'Directory',
      path: directory,
    })

    state.pathEntries.push(pathEntry)
    state.currentPathEntry = pathEntry
    stateStatusOk(state, {
      who,
      message: 'created directory',
      data: { directory },
    })
  } else {
    stateStatusError(state, {
      who,
      message: response.statusText,
    })
  }
}

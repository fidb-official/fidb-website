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
  path: string,
): Promise<void> {
  const who = 'stateCreateDirectory'

  stateStatusRunning(state, { who, message: 'creating' })

  if (state.pathEntries.find((pathEntry) => pathEntry.path === path)) {
    stateStatusOk(state, {
      who,
      message: 'path already exists',
      data: { path },
    })
    return
  }

  const response = await fetch(`${state.url}/${path}?kind=directory`, {
    method: 'POST',
    headers: {
      authorization: useGlobalToken().authorization,
    },
  })

  if (response.ok) {
    const pathEntry = createPathEntry({
      kind: 'Directory',
      path,
    })

    state.pathEntries.push(pathEntry)
    state.currentPathEntry = pathEntry
    stateStatusOk(state, {
      who,
      message: 'created directory',
      data: { path },
    })
  } else {
    stateStatusError(state, {
      who,
      message: response.statusText,
    })
  }
}

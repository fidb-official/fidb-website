import { useGlobalToken } from '../../reactives/useGlobalToken'
import { createPathEntry, PathEntry } from './PathEntry'
import { State } from './State'
import {
  stateStatusError,
  stateStatusOk,
  stateStatusRunning,
} from './stateStatus'

export async function stateCreateFile(
  state: State,
  path: string,
  children: Array<PathEntry>,
): Promise<void> {
  const who = 'stateCreateFile'

  stateStatusRunning(state, { who, message: 'creating' })

  if (state.pathEntries.find((pathEntry) => pathEntry.path === path)) {
    stateStatusOk(state, {
      who,
      message: 'path already exists',
      data: { path },
    })
    return
  }

  const response = await fetch(`${state.url}/${path}?kind=file`, {
    method: 'POST',
    headers: {
      authorization: useGlobalToken().authorization,
    },
  })

  if (response.ok) {
    const pathEntry = createPathEntry({
      kind: 'File',
      path,
    })

    children.push(pathEntry)
    state.currentPathEntry = pathEntry
    stateStatusOk(state, {
      who,
      message: 'file created',
      data: { path },
    })
  } else {
    stateStatusError(state, {
      who,
      message: response.statusText,
    })
  }
}

import { useGlobalToken } from '../../reactives/useGlobalToken'
import { PathEntry } from './PathEntry'
import { State } from './State'
import {
  stateStatusError,
  stateStatusOk,
  stateStatusRunning,
} from './stateStatus'

export async function stateDeletePathEntry(
  state: State,
  pathEntry: PathEntry,
): Promise<void> {
  const who = 'stateDeletePathEntry'

  stateStatusRunning(state, {
    who,
    message: 'deleting',
    data: { pathEntry },
  })

  const response = await fetch(
    `${state.url}/${pathEntry.path}?kind=${pathEntry.kind}`,
    {
      method: 'DELETE',
      headers: {
        authorization: useGlobalToken().authorization,
      },
    },
  )

  if (response.ok) {
    stateRemovePathEntry(state, pathEntry.path)
    stateStatusOk(state, {
      who,
      message: 'pathEntry deleted',
      data: { pathEntry },
    })
  } else {
    stateStatusError(state, {
      who,
      message: response.statusText,
    })
  }
}

function stateRemovePathEntry(state: State, path: string): void {
  removePathEntry(path, state.pathEntries)

  if (state.currentPathEntry?.path === path) {
    state.currentPathEntry = state.pathEntries[0]
  }
}

function removePathEntry(path: string, pathEntries: Array<PathEntry>): void {
  const index = pathEntries.findIndex((pathEntry) => pathEntry.path === path)

  if (index !== -1) {
    pathEntries.splice(index, 1)
    return
  }

  for (const pathEntry of pathEntries) {
    if (pathEntry.kind === 'Directory') {
      removePathEntry(path, pathEntry.children)
    }
  }
}

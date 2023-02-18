import { useGlobalToken } from '../../reactives/useGlobalToken'
import { createPathEntry, PathEntry } from './PathEntry'
import { State } from './State'
import { stateStatusError } from './stateStatus'

export async function stateLoadPathEntryChildren(
  state: State,
  pathEntry: PathEntry,
): Promise<void> {
  if (pathEntry.kind !== 'Directory') {
    return
  }

  const who = 'stateLoadPathEntryChildren'

  const directory = pathEntry.path

  const response = await fetch(`${state.url}/${directory}?kind=directory`, {
    method: 'GET',
    headers: {
      authorization: useGlobalToken().authorization,
    },
  })

  if (!response.ok) {
    stateStatusError(state, {
      who,
      message: response.statusText,
      data: {
        directory,
      },
    })
  }

  const { results } = await response.json()

  pathEntry.children = results.map(createPathEntry)
}

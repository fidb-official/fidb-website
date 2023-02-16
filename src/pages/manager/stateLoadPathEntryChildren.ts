import { join } from 'path-browserify'
import { useGlobalToken } from '../../reactives/useGlobalToken'
import { createPathEntry, PathEntry } from './PathEntry'
import { State } from './State'
import { stateStatusError } from './stateStatus'

export async function stateLoadPathEntryChildren(
  state: State,
  pathEntry: PathEntry,
): Promise<void> {
  if (!pathEntry.isDirectory) {
    return
  }

  const who = 'stateLoadPathEntryChildren'

  const directory = pathEntry.path

  const response = await fetch(`${state.url}/${directory}?kind=list`, {
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

  const { directories } = await response.json()

  const pathEntries = directories.map((path: string) =>
    createPathEntry({
      path: join(pathEntry.path, path),
      isDirectory: true,
      isFile: false,
    }),
  )

  pathEntry.children = pathEntries
}

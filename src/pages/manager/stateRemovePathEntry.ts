import { PathEntry } from './PathEntry'
import { State } from './State'

export function stateRemovePathEntry(state: State, path: string): void {
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
    removePathEntry(path, pathEntry.children)
  }
}

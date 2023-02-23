import { listPathEntries } from './loadState'
import { PathEntry, pathEntryPartialSummation } from './PathEntry'
import { State } from './State'

export async function stateOpenCurrentPathEntry(state: State): Promise<void> {
  const currentPathEntry = state.currentPathEntry
  if (currentPathEntry === undefined) {
    return
  }

  const pathEntries = pathEntryPartialSummation(currentPathEntry)

  for (const pathEntry of pathEntries) {
    if (
      pathEntry.path === currentPathEntry.path &&
      pathEntry.kind === 'Directory' &&
      currentPathEntry.kind === 'Directory'
    ) {
      pathEntry.isOpen = currentPathEntry.isOpen
    }
  }

  await openPathEntries(state.url, pathEntries)

  const parentPathEntry = pathEntries[0]

  const index = state.pathEntries.findIndex(
    (pathEntry) => pathEntry.path === parentPathEntry.path,
  )

  if (index === -1) {
    state.pathEntries.push(parentPathEntry)
  } else {
    state.pathEntries.splice(index, 1, parentPathEntry)
  }
}

async function openPathEntries(
  url: string,
  pathEntries: Array<PathEntry>,
): Promise<void> {
  const [first, second, ...rest] = pathEntries

  if (second === undefined) {
    if (first.kind === 'Directory' && first.isOpen) {
      await openPathEntry(url, first)
    }

    return
  }

  await openPathEntry(url, first)

  if (first.kind === 'Directory') {
    const index = first.children.findIndex(
      (child) => child.path === second.path,
    )

    if (index === -1) {
      first.children.push(second)
    } else {
      first.children.splice(index, 1, second)
    }
  }

  await openPathEntries(url, [second, ...rest])
}

async function openPathEntry(url: string, pathEntry: PathEntry): Promise<void> {
  if (pathEntry.kind !== 'Directory') {
    return
  }

  pathEntry.isOpen = true
  pathEntry.children = await listPathEntries(url, pathEntry.path)
}

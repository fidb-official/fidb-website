import qs from 'qs'
import { useGlobalToken } from '../../reactives/useGlobalToken'
import {
  createPathEntry,
  PathEntry,
  pathEntryPartialSummation,
} from './PathEntry'
import { createState, State } from './State'

export type LoadStateOptions = {
  url: string
}

export async function loadState(options: LoadStateOptions): Promise<State> {
  try {
    const pathEntries = await listPathEntries(options.url, '')

    const state = createState({
      url: options.url,
      pathEntries,
      ...parseCurrentQueryString(),
    })

    await stateOpenCurrentPathEntry(state)

    return state
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        [`[loadState] ${error.message}`, `  url: ${options.url}`].join('\n'),
      )
    }

    throw error
  }
}

function parseCurrentQueryString() {
  const query = qs.parse(new URL(window.location.href).search, {
    ignoreQueryPrefix: true,
  })

  const currentPathEntry = !query.currentPathKind
    ? undefined
    : !query.currentPath
    ? undefined
    : createPathEntry({
        kind: String(query.currentPathKind) as any,
        path: String(query.currentPath),
        isOpen: query.currentPathIsOpen === undefined ? undefined : true,
      })

  return {
    currentPathEntry,
    page: Number.isNaN(Number.parseInt(String(query.page)))
      ? 1
      : Number.parseInt(String(query.page)),
    currentRowIndex: Number.isNaN(
      Number.parseInt(String(query.currentRowIndex)),
    )
      ? undefined
      : Number.parseInt(String(query.currentRowIndex)),
    currentRowIsOpen: query.currentRowIsOpen === undefined ? undefined : true,
    currentCellIndex: Number.isNaN(
      Number.parseInt(String(query.currentCellIndex)),
    )
      ? undefined
      : Number.parseInt(String(query.currentCellIndex)),
    currentCellColumnName: query.currentCellColumnName
      ? String(query.currentCellColumnName)
      : undefined,
    currentCellIsOpen: query.currentCellIsOpen === undefined ? undefined : true,
  }
}

async function stateOpenCurrentPathEntry(state: State): Promise<void> {
  const currentPathEntry = state.currentPathEntry
  if (currentPathEntry === undefined) {
    return
  }

  const pathEntries = pathEntryPartialSummation(currentPathEntry)

  for (const pathEntry of pathEntries) {
    if (pathEntry.path === currentPathEntry.path) {
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
    if (first.isOpen) {
      await openPathEntry(url, first)
    }
    return
  }

  await openPathEntry(url, first)

  const index = first.children.findIndex((child) => child.path === second.path)

  if (index === -1) {
    first.children.push(second)
  } else {
    first.children.splice(index, 1, second)
  }

  await openPathEntries(url, [second, ...rest])
}

async function openPathEntry(url: string, pathEntry: PathEntry): Promise<void> {
  pathEntry.isOpen = true

  if (pathEntry.kind === 'Directory') {
    pathEntry.children = await listPathEntries(url, pathEntry.path)
  }
}

export async function listPathEntries(
  url: string,
  path: string,
): Promise<Array<PathEntry>> {
  const response = await fetch(`${url}/${path}?kind=directory`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: useGlobalToken().authorization,
    },
  })

  if (!response.ok) {
    throw new Error(
      [
        `[listPathEntries] fail to fetch list`,
        `  url: ${url}`,
        `  path: ${path}`,
        `  status.code: ${response.status}`,
        `  status.message: ${response.statusText}`,
      ].join('\n'),
    )
  }

  const { results } = await response.json()

  return results.map(createPathEntry)
}

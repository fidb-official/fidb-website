import qs from 'qs'
import { createState, State } from './State'
import { stateUpdateDataset } from './stateUpdateDataset'

export type LoadStateOptions = {
  url: string
}

export async function loadState(options: LoadStateOptions): Promise<State> {
  try {
    const response = await fetch(`${options.url}`)

    if (!response.ok) {
      throw new Error(
        [
          `[loadState] fail to fetch url`,
          `  url: ${options.url}`,
          `  status.code: ${response.status}`,
          `  status.message: ${response.statusText}`,
        ].join('\n'),
      )
    }

    const { root, directories } = await response.json()

    const query = qs.parse(new URL(window.location.href).search, {
      ignoreQueryPrefix: true,
    })

    const state = createState({
      url: options.url,
      root,
      directories,
      currentDirectory:
        query.currentDirectory === undefined
          ? undefined
          : String(query.currentDirectory),
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
      currentCellIsOpen:
        query.currentCellIsOpen === undefined ? undefined : true,
    })

    await stateUpdateDataset(state)

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

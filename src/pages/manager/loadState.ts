import qs from 'qs'
import { useGlobalToken } from '../../reactives/useGlobalToken'
import { createState, State } from './State'

export type LoadStateOptions = {
  url: string
}

export async function loadState(options: LoadStateOptions): Promise<State> {
  try {
    const response = await fetch(`${options.url}?kind=list`, {
      method: 'GET',
      headers: {
        authorization: useGlobalToken().authorization,
      },
    })

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

    const { directories } = await response.json()

    const query = qs.parse(new URL(window.location.href).search, {
      ignoreQueryPrefix: true,
    })

    return createState({
      url: options.url,
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
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        [`[loadState] ${error.message}`, `  url: ${options.url}`].join('\n'),
      )
    }

    throw error
  }
}

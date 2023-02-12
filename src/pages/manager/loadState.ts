import qs from 'qs'
import { createState, State } from './State'

export async function loadState(options: { url: string }): Promise<State> {
  const response = await fetch(`${options.url}`)
  const { root, directories } = await response.json()

  const query = qs.parse(new URL(window.location.href).search, {
    ignoreQueryPrefix: true,
  })

  return createState({
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
    currentCellIsOpen: query.currentCellIsOpen === undefined ? undefined : true,
  })
}

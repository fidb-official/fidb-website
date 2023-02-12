import { Cell } from './Cell'
import { createTable, Table } from './Table'

export type StateOptions = {
  url: string
  root: string
  page?: number
  directories: Array<string>
}

export type State = StateOptions & {
  currentDirectory?: string
  page: number
  size: number
  dataset: Array<any>
  table: Table
  currentRowIsOpen: boolean
  currentRowIndex?: number
  currentCell?: Cell
  message: string
  status: 'ok' | 'running' | 'error'
}

export function createState(options: StateOptions): State {
  const { url, root, directories, page } = options

  return {
    url,
    root,
    directories,
    currentDirectory: directories[0],
    page: page || 1,
    size: 50,
    dataset: [],
    get table() {
      return createTable(this.dataset)
    },
    currentRowIsOpen: false,
    message: '',
    status: 'ok',
  }
}

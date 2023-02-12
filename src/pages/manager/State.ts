import { Cell } from './Cell'
import { createTable, Table } from './Table'

export type StateOptions = {
  url: string
  root: string
  page: number
  currentDirectory?: string
  currentRowIndex?: number
  currentRowIsOpen?: boolean
  currentCellIndex?: number
  currentCellColumnName?: string
  directories: Array<string>
}

export type State = StateOptions & {
  size: number
  dataset: Array<any>
  table: Table
  currentCell?: Cell
  message: string
  status: 'ok' | 'running' | 'error'
  isCurrentCell(cell: Cell): boolean
}

export function createState(options: StateOptions): State {
  const {
    url,
    root,
    currentDirectory,
    directories,
    page,
    currentRowIsOpen,
    currentRowIndex,
    currentCellIndex,
    currentCellColumnName,
  } = options

  return {
    url,
    root,
    directories,
    currentDirectory: currentDirectory || directories[0],
    page,
    size: 50,
    dataset: [],
    get table() {
      return createTable(this.dataset)
    },
    currentRowIndex,
    currentRowIsOpen,
    currentCellIndex,
    currentCellColumnName,
    isCurrentCell(cell: Cell): boolean {
      return (
        cell.index === this.currentCellIndex &&
        cell.columnName === this.currentCellColumnName
      )
    },
    message: '',
    status: 'ok',
  }
}

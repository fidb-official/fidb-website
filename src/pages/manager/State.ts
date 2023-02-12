import { Cell, createCell } from './Cell'
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
    set currentCell(cell: Cell | undefined) {
      if (cell === undefined) {
        return
      }

      this.currentCellIndex = cell.index
      this.currentCellColumnName = cell.columnName
    },
    get currentCell(): Cell | undefined {
      if (this.currentCellIndex === undefined) {
        return
      }
      if (this.currentCellColumnName === undefined) {
        return
      }

      const data = this.dataset[this.currentCellIndex]
      const value = data[this.currentCellColumnName]
      if (value === undefined) {
        return
      }

      return createCell(
        this.currentCellIndex,
        this.currentCellColumnName,
        value,
      )
    },
    message: '',
    status: 'ok',
  }
}

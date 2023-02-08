import { Cell } from './Cell'

export type Table = {
  columnNames: Array<string>
  rows: Array<{
    data: any
    cells: Array<Cell>
  }>
}

export function createTable(dataset: Array<any>): Table {
  const columnNames = Array.from(new Set(dataset.flatMap(Object.keys)))
  const rows = dataset.map((data) => ({
    data,
    cells: columnNames.map((columnName) => ({
      columnName,
      value: data[columnName],
    })),
  }))

  return {
    columnNames,
    rows,
  }
}

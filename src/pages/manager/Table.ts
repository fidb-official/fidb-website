import { createRow, Row } from './Row'

export type Table = {
  columnNames: Array<string>
  rows: Array<Row>
}

export function createTable(dataset: Array<any>): Table {
  const columnNames = Array.from(new Set(dataset.flatMap(Object.keys)))
  const rows = dataset.map((data) => createRow(columnNames, data))

  return {
    columnNames,
    rows,
  }
}

import { createRow, Row } from './Row'

export type Table = {
  columnNames: Array<string>
  rows: Array<Row>
}

export function tableColumnNames(dataset: Array<any>): Array<string> {
  return Array.from(new Set(dataset.flatMap(Object.keys)))
}

export function createTable(dataset: Array<any>): Table {
  const columnNames = tableColumnNames(dataset)
  const rows = dataset.map((data, index) => createRow(index, columnNames, data))

  return {
    columnNames,
    rows,
  }
}

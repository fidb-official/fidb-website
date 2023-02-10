import { createRow, Row } from './Row'

export type Table = {
  columnNames: Array<string>
  rows: Array<Row>
}

function arrayDedup<A>(array: Array<A>): Array<A> {
  return Array.from(new Set(array))
}

export function tableColumnNames(dataset: Array<any>): Array<string> {
  let columnNames = dataset.flatMap(Object.keys)

  if (columnNames.includes('@id')) {
    columnNames.unshift('@id')
  }

  return arrayDedup(columnNames)
}

export function createTable(dataset: Array<any>): Table {
  const columnNames = tableColumnNames(dataset)
  const rows = dataset.map((data, index) => createRow(index, columnNames, data))

  return {
    columnNames,
    rows,
  }
}

import { Column, createColumn } from './Column'
import { createRow, Row } from './Row'

export type Table = {
  columns: Array<Column>
  rows: Array<Row>
}

function arrayDedup<A>(array: Array<A>): Array<A> {
  return Array.from(new Set(array))
}

export function tableColumnNames(dataset: Array<any>): Array<string> {
  let columnNames = dataset.flatMap(Object.keys)

  // '@id' as the first column
  if (columnNames.includes('@id')) {
    columnNames.unshift('@id')
  }

  // '@revision' as the last column
  if (columnNames.includes('@revision')) {
    columnNames.splice(columnNames.indexOf('@revision'), 1)
    columnNames.push('@revision')
  }

  return arrayDedup(columnNames)
}

export function createTable(dataset: Array<any>): Table {
  const columnNames = tableColumnNames(dataset)
  const columns = columnNames.map((name) => createColumn(dataset, name))
  const rows = dataset.map((data, index) => createRow(index, columnNames, data))

  return {
    columns,
    rows,
  }
}

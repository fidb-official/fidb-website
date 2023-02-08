import { Cell, createCell } from './Cell'

export type Row = {
  data: any
  cells: Array<Cell>
}

export function createRow(columnNames: Array<string>, data: any): Row {
  return {
    data,
    cells: columnNames.map((columnName) =>
      createCell(columnName, data[columnName]),
    ),
  }
}

import { Cell, createCell } from './Cell'

export type Row = {
  cells: Array<Cell>
}

export function createRow(columnNames: Array<string>, data: any): Row {
  return {
    cells: columnNames.map((columnName) =>
      createCell(data['@id'], data['@revision'], columnName, data[columnName]),
    ),
  }
}

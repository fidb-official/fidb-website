import { Cell, createCell } from './Cell'

export type Row = {
  cells: Array<Cell>
}

export function createRow(
  index: number,
  columnNames: Array<string>,
  data: any,
): Row {
  return {
    cells: columnNames.map((columnName) =>
      createCell(index, columnName, data[columnName]),
    ),
  }
}

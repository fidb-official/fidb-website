export type Cell = {
  columnName: string
  value: any
}

export function createCell(columnName: string, value: any): Cell {
  return {
    columnName,
    value,
  }
}

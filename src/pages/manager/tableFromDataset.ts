import { Table } from './Table'

export function tableFromDataset(dataset: Array<any>): Table {
  const columnNames = Array.from(new Set(dataset.flatMap(Object.keys)))
  const rows = dataset.map((data) => columnNames.map((name) => data[name]))

  return {
    columnNames,
    rows,
  }
}

import { CellKind, valueKind } from './Cell'

export type Column = {
  name: string
  kind?: CellKind
}

export function createColumn(dataset: Array<any>, name: string): Column {
  const firstData = dataset[0]
  if (firstData !== undefined && firstData[name] !== undefined) {
    return {
      name,
      kind: valueKind(firstData[name]),
    }
  }

  return {
    name,
  }
}

import { Table, tableFromDataset } from './Table'

export type StateOptions = {
  url: string
  root: string
  directories: Array<string>
}

export type State = StateOptions & {
  currentDirectory?: string
  dataset: Array<any>
  table: Table
}

export function createState(options: StateOptions): State {
  const { url, root, directories } = options
  const currentDirectory = directories[0]
  const dataset: Array<any> = []
  return {
    url,
    root,
    directories,
    currentDirectory,
    dataset,
    get table() {
      return tableFromDataset(this.dataset)
    },
  }
}

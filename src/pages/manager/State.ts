import { Json } from '../../utils/Json'

export interface State {
  url: string
  root: string
  directories: Array<string>
  currentDirectory?: string
  dataset: Array<Json>
}

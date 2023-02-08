import { Json } from '../../utils/Json'

export type Table = {
  columnNames: Array<string>
  rows: Array<Json | undefined>
}

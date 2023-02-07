import type { JsonObject } from '../utils/Json'

export type Data = JsonObject & {
  '@id': string
  '@revision': string
}

export type DataOmitRevision = JsonObject & {
  '@id': string
}

export type DataOmitId = JsonObject & {
  '@revision': string
}

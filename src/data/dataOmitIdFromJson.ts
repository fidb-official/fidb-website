import { isJsonObject, Json } from '../utils/Json'
import type { DataOmitId } from './Data'

export function dataOmitIdFromJson(json: Json): DataOmitId {
  if (!isJsonObject(json)) {
    throw new Error(
      [
        `[dataOmitIdFromJson] expect JsonObject`,
        `  json: ${JSON.stringify(json)}`,
      ].join('\n'),
    )
  }

  if (typeof json['@revision'] !== 'string') {
    throw new Error(
      [
        `[dataOmitIdFromJson] expect @revision to be string`,
        `  @revision: ${JSON.stringify(json['@revision'])}`,
      ].join('\n'),
    )
  }

  return json as DataOmitId
}

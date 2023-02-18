import { arrayBufferToText } from './arrayBufferToText'
import { Json } from './Json'

export function arrayBufferToJsonOrError(buffer: ArrayBuffer): Json | Error {
  try {
    return JSON.parse(arrayBufferToText(buffer))
  } catch (error) {
    if (error instanceof Error) {
      return error
    }

    throw error
  }
}

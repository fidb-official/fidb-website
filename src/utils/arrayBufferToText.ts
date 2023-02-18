export function arrayBufferToText(buffer: ArrayBuffer): string {
  return new TextDecoder().decode(new Uint8Array(buffer))
}

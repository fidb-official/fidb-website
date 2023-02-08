export type Value = String | Number | Null | Boolean | Array | Table | Objekt

export type String = {
  '@type': 'Value'
  '@kind': 'String'
  data: string
}

export function String(data: string): String {
  return {
    '@type': 'Value',
    '@kind': 'String',
    data,
  }
}

export type Number = {
  '@type': 'Value'
  '@kind': 'Number'
  data: number
}

export function Number(data: number): Number {
  return {
    '@type': 'Value',
    '@kind': 'Number',
    data,
  }
}

export type Null = {
  '@type': 'Value'
  '@kind': 'Null'
}

export function Null(): Null {
  return {
    '@type': 'Value',
    '@kind': 'Null',
  }
}

export type Boolean = {
  '@type': 'Value'
  '@kind': 'Boolean'
  data: boolean
}

export function Boolean(data: boolean): Boolean {
  return {
    '@type': 'Value',
    '@kind': 'Boolean',
    data,
  }
}

export type Array = {
  '@type': 'Value'
  '@kind': 'Array'
  data: any[]
}

export function Array(data: any[]): Array {
  return {
    '@type': 'Value',
    '@kind': 'Array',
    data,
  }
}

export type Table = {
  '@type': 'Value'
  '@kind': 'Table'
  data: Record<string, any>[]
}

export function Table(data: Record<string, any>[]): Table {
  return {
    '@type': 'Value',
    '@kind': 'Table',
    data,
  }
}

export type Objekt = {
  '@type': 'Value'
  '@kind': 'Objekt'
  data: Record<string, any>
}

export function Objekt(data: Record<string, any>): Objekt {
  return {
    '@type': 'Value',
    '@kind': 'Objekt',
    data,
  }
}

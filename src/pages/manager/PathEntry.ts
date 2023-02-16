import { basename } from 'path-browserify'

export type PathEntryOptions = {
  path: string
  isFile: boolean
  isDirectory: boolean
}

export type PathEntry = PathEntryOptions & {
  basename: string
  children: Array<PathEntry>
  isOpen: boolean
}

export function createPathEntry(options: PathEntryOptions): PathEntry {
  const { path, isFile, isDirectory } = options

  return {
    path,
    get basename() {
      return basename(this.path)
    },
    children: [],
    isFile,
    isDirectory,
    isOpen: false,
  }
}

export type PathEntry = {
  path: string
  basename: string
  children: Array<PathEntry>
  isFile: boolean
  isDirectory: boolean
  isOpen: boolean
}

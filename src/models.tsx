export interface IFileInfo {
  name: string
  isDir: boolean
  size: number
  accessTime: number
  modifyTime: number
  createTime: number
  type: FileType
}

export interface IFilePath {
  path: string
}

export enum FileType {
  UNKNOWN = 1,
  FOLDER = 2,
  TEXT = 3,
  IMAGE = 4,
  VIDEO = 5,
  AUDIO = 6,
}



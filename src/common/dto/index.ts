export class ResponseData {}
export type QueryDto = {
  pageNum?: number
  pageSize?: number
  [index: string]: any
}
export type ListDto<T> = {
  total?: number
  data: T[]
  _flag?: boolean
  [index: string]: any
}
export type PageQueryDto = {
  pageNum: number
  pageSize: number
  [index: string]: any
}

export type PageListDto<T> = {
  total: number
  data: T[]
  _flag?: boolean
  [index: string]: any
}

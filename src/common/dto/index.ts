export class ResponseData {}
export type QueryOneDto = {
  id?: string
  [index: string]: any
}
export type QueryListDto = {
  pageNum?: number
  pageSize?: number
  [index: string]: any
}
export type ResponseListDto<T> = {
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

export type PageQueryDto = {
  pageNum: number
  pageSize: number
  [index: string]: any
}

export type PageListDto<T> = {
  total: number
  data: T[]
}

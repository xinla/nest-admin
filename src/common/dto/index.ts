export type PageQueryDto = {
  pageNum: number
  pageSize: number
}

export type PageListDto<T> = {
  total: number
  data: T[]
}

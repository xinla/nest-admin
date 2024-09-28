export class ResponseData {}
// export interface SaveDto<T> extends Partial<T> {}

export type SaveDto<T> = {
  [index: string]: any
} & Partial<T>

export type QueryOneDto = {
  id?: string
  [index: string]: any
}
export type QueryListDto = {
  pageNum?: number // 当前页码 从1开始 默认1
  pageSize?: number // 每页条数 默认10
  [index: string]: any
}
export type ResponseListDto<T> = {
  total?: number // 总条数
  data: T[]
  _flag?: boolean // 自定义标记
  [index: string]: any
}
// export type PageQueryDto = {
//   pageNum: number
//   pageSize: number
//   [index: string]: any
// }

// export type PageListDto<T> = {
//   total: number
//   data: T[]
//   _flag?: boolean
//   [index: string]: any
// }

export interface IResponse {
  statusCode: string;
  message: string;
}

export interface IResponsePagination extends IResponse {
  currentPage: number;
  currentItem: number;
  totalPage: number;
  totalItem: number;
}

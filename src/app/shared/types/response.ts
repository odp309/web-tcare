export interface IResponse {
  statusCode: string;
  message: string;
}

export interface IResponsePagination extends IResponse {
  current_page: number;
  current_item: number;
  total_page: number;
  total_item: number;
}

export interface IResponseReport extends IResponse {
  total: number;
  total_all_year: number;
  year: number;
}

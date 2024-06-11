import { IResponse, IResponsePagination } from './response';

export type TResultTicket = {
  id: number;
  ticket_number: string;
  category: string;
  time_response: string;
  division_target: string;
  status: string;
  rating: number;
  created_at: string;
  updated_at: string;
};

export interface ITicketReports extends IResponsePagination {
  result: TResultTicket[];
}

import { IResponse } from './response';

export type TResultTicket = {
  id: number;
  ticket_number: string;
  category: string;
  time_response: string;
  status: string;
  rating: number;
  created_at: string;
  updated_at: string;
};

export interface ITicketReports extends IResponse {
  result: TResultTicket[];
}

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

export interface IUpdateTicket extends IResponse {
  result: {
    status: string;
  };
}

export interface ITicketDetail extends IResponse {
  result: {
    reporter_detail: {
      nama: string;
      account_number: string;
      address: string;
      no_handphone: string;
    };
    report_detail: {
      transaction_date: string;
      amount: number;
      category: string;
      description: string;
      reference_num: string | null;
    };
    report_status_detail: {
      report_date: string;
      ticket_number: string;
      status: 'Diajukan' | 'Dalam Proses' | 'Selesai';
    };
  };
}

export interface ITrackStatus extends IResponse {
  result: IResTrackStatus[];
}

export type IResTrackStatus = {
  pic: string;
  date: string;
  description: string;
} | null;

export type TDataDetail = {
  title: string;
  details: {
    detailTitle: string;
    detailDesc: string | null;
  }[];
};

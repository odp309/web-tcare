import { IResponseReport } from './response';

export interface IReportReopened extends IResponseReport {
  result: {
    percentage: number;
  };
}

export interface ISlaPerformance extends IResponseReport {
  result: {
    percentage_sla_performance: number;
  };
}

export interface IWeeklyGraph extends IResponseReport {
  result: {
    minggu_1: number;
    minggu_2: number;
    minggu_3: number;
    minggu_4: number;
    minggu_5: number;
  };
}

export type TGraphWeekLabel = {
  category: string[];
  status: string[];
  rating: string[];
};

export type TChosenDropdown = {
  category: string;
  status: string;
  rating: string;
};

export type TGraphWeekData = {
  category: number[];
  status: number[];
  rating: number[];
};

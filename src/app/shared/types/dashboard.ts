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

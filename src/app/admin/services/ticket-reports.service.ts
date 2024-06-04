import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiServiceService } from '../../shared/services/api-service.service';

@Injectable({
  providedIn: 'root',
})
export class TicketReportsService extends ApiServiceService {
  constructor(http: HttpClient) {
    super(http);
  }
  
}

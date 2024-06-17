import { TestBed } from '@angular/core/testing';

import { TicketReportsService } from './ticket-reports.service';

describe('TicketReportsService', () => {
  let service: TicketReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

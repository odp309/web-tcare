import { TestBed } from '@angular/core/testing';

import { DetailTicketService } from './detail-ticket.service';

describe('DetailTicketService', () => {
  let service: DetailTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

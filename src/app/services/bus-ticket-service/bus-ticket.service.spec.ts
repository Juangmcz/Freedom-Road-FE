import { TestBed } from '@angular/core/testing';

import { BusTicketServiceService } from './bus-ticket.service';

describe('BusTicketServiceService', () => {
  let service: BusTicketServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusTicketServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

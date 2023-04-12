import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusTicketListComponent } from './bus-ticket-list.component';

describe('BusTicketListComponent', () => {
  let component: BusTicketListComponent;
  let fixture: ComponentFixture<BusTicketListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusTicketListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusTicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusTicketListContainerComponent } from './bus-ticket-list-container.component';

describe('BusTicketListContainerComponent', () => {
  let component: BusTicketListContainerComponent;
  let fixture: ComponentFixture<BusTicketListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusTicketListContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusTicketListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

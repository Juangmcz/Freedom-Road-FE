import { Component, Input } from '@angular/core';
import { BusTicket } from 'src/app/models/bus-ticket.model';

@Component({
  selector: 'app-bus-ticket',
  templateUrl: './bus-ticket.component.html',
  styleUrls: ['./bus-ticket.component.scss'],
})
export class BusTicketComponent {
  private busTickets: Set<any> | undefined | null;

  @Input() busTicket: BusTicket = {
    origin: '',
    destination: '',
    imageUrl: '',
    price: 0,
    numberOfTickets: 0,
  };
}

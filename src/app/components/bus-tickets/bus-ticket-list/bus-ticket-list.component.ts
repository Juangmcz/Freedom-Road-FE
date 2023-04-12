import { Component, OnInit } from '@angular/core';
import { BusTicket } from 'src/app/models/bus-ticket.model';
import { BusTicketService } from 'src/app/services/bus-ticket-service/bus-ticket.service';

@Component({
  selector: 'app-bus-ticket-list',
  templateUrl: './bus-ticket-list.component.html',
  styleUrls: ['./bus-ticket-list.component.scss'],
})
export class BusTicketListComponent implements OnInit {
  busTickets: BusTicket[] = [];
  total: number = this.busTickets.length;

  constructor(private service: BusTicketService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (busTicket) => {
        (this.busTickets = busTicket), (this.total = this.busTickets.length);
      },
      error: console.log,
      complete: console.log,
    });
  }
}

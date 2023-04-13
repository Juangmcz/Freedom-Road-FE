import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BusTicket } from 'src/app/models/bus-ticket.model';
import { UserService } from 'src/app/services/user-service/user.service';

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

  constructor(private userService: UserService, private router: Router) {}

  addToCart() {
    let tickets: any[] = JSON.parse(localStorage.getItem('items') || '[]');

    if (!this.userService.getState()) {
      this.router.navigate(['/login']);
    }

    if (
      !(
        tickets?.filter((ticket) => ticket.origin === this.busTicket.origin)
          .length > 0
      )
    ) {
      tickets?.push(this.busTicket);
      localStorage.setItem('items', JSON.stringify(tickets));
    }
  }
}

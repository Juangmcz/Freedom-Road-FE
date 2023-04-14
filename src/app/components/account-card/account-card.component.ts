import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer-service/customer.service';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
})
export class AccountCardComponent implements OnInit {
  customerById: Customer[] = [];

  @Input() customer: Customer = {
    dni: '',
    name: '',
    lastName: '',
    email: '',
    cell: '',
  };

  constructor(private service: CustomerService) {}

  ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem('user') || '{}').id);
    this.service
      .getById(JSON.parse(localStorage.getItem('user') || '{}').id)
      .subscribe({
        next: (customer) => {
          this.customer = customer;
        },
        error: console.log,
        complete: console.log,
      });
  }

  updateCellPhone() {}
}

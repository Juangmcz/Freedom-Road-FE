import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BusTicket } from 'src/app/models/bus-ticket.model';
import { PurchaseOrder } from 'src/app/models/purchase-order.model';
import { PurchaseOrderService } from 'src/app/services/purchase-order-service/purchase-order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent {
  items: BusTicket[] = [];
  uniqueItems: BusTicket[] = this.items.filter(
    (busTicket, i, arr) =>
      arr.findIndex((ticket) => ticket.origin === busTicket.origin) === i
  );
  itemsQuantity: Map<string, number> = new Map<string, number>();
  insurance: boolean = false;
  insuranceCost: number = 0;
  subtotal: number = 0;
  total: number = 0;

  constructor(private service: PurchaseOrderService, private router: Router) {}

  ngOnInit(): void {
    this.items = JSON.parse(localStorage.getItem('items') || '[]');
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      this.items = JSON.parse(storedItems);
      this.calculateTotal();
    }

    this.items.map((item: BusTicket) => {
      if (!this.itemsQuantity.get(item.origin)) {
        let quantity: number = this.items?.filter(
          (i: { origin: string }) => i.origin === item.origin
        ).length;
        this.itemsQuantity.set(item.origin, quantity);
      }
    });

    this.uniqueItems = this.items.filter(
      (item, i, arr) => arr.findIndex((itm) => itm.origin === item.origin) === i
    );
  }

  removeFromCart(item: BusTicket): void {
    Swal.fire({ title: 'Removing item from cart', timer: 500 });
    this.items = this.items?.filter(
      (i: { origin: string }) => i.origin !== item.origin
    );
    this.uniqueItems = this.items.filter(
      (item, i, arr) => arr.findIndex((itm) => itm.origin === item.origin) === i
    );
    localStorage.setItem('items', JSON.stringify(this.items));
    this.calculateTotal();
  }

  clearCart(): void {
    this.items = [];
    localStorage.removeItem('items');
    this.calculateTotal();
  }

  increaseQuantity(item: BusTicket): void {
    let items = JSON.parse(localStorage.getItem('items') || '[]');

    items.push(item);
    let filteredItems: any[] = items?.filter(
      (i: { origin: string }) => i.origin === item.origin
    );
    this.itemsQuantity.set(item.origin, filteredItems.length);
    localStorage.setItem('items', JSON.stringify(items));
    this.calculateTotal();
  }

  decreaseQuantity(item: BusTicket): void {
    let items = JSON.parse(localStorage.getItem('items') || '[]');

    if (
      items?.filter((i: { origin: string }) => i.origin === item.origin)
        .length > 1
    ) {
      let filteredItems: any[] = items?.filter(
        (i: { origin: string }) => i.origin === item.origin
      );
      let unfilteredItems: any[] = items?.filter(
        (i: { origin: string }) => i.origin !== item.origin
      );
      filteredItems.pop();
      let allItems: any[] = filteredItems.concat(unfilteredItems);
      this.itemsQuantity.set(item.origin, filteredItems.length);

      localStorage.setItem('items', JSON.stringify(allItems));
      this.calculateTotal();
    }
  }

  getItemQuantity(item: BusTicket): any {
    console.log(this.itemsQuantity);
    console.log(this.itemsQuantity.get(item.origin));
    return this.itemsQuantity.get(item.origin);
  }

  calculateTotal() {
    this.items = JSON.parse(localStorage.getItem('items') || '[]');
    this.subtotal = 0;
    this.total = 0;

    if (this.items) {
      this.items.forEach((item) => {
        this.subtotal += item.price;
      });
    }
    this.total = this.subtotal + this.insuranceCost;
  }

  enableTravelInsurance(): void {
    Swal.fire({
      title: 'Travel Insurance',
      text: 'Do you want to add travel insurance to your order?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'No, thanks',
    });
    this.insurance = !this.insurance;
    this.insuranceCost = this.insurance ? 4500 : 0;
    this.calculateTotal();
  }

  placeOrder(): void {
    if (this.items.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Your cart is empty!',
      });
      return;
    }
    Swal.fire({
      title: 'Do you want to continue?',
      text: 'You are about to place your order.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your order has been placed.', 'success');
        console.log(this.initializeOrder());
        this.service.save(this.initializeOrder()).subscribe((answer) => {
          console.log(answer);
        });
        localStorage.removeItem('items');
        window.location.reload();
      }
    });
  }

  initializeOrder(): PurchaseOrder {
    this.calculateTotal();
    let newOrder: PurchaseOrder = {
      userId: JSON.parse(localStorage.getItem('user') || '{}').id,
      status: 'Completed',
      total: this.total,
      purchaseDate: new Date(),
      numberOfPassengers: this.items.length,
    };
    return newOrder;
  }
}

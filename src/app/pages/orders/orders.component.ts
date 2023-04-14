import { Component, OnInit } from '@angular/core';
import { PurchaseOrder } from 'src/app/models/purchase-order.model';
import { PurchaseOrderService } from 'src/app/services/purchase-order-service/purchase-order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  purchaseOrders: PurchaseOrder[] = [];
  total: number = this.purchaseOrders.length;

  constructor(private service: PurchaseOrderService) {}
  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (purchaseOrder) => {
        (this.purchaseOrders = purchaseOrder),
          (this.total = this.purchaseOrders.length);
      },
      error: console.log,
      complete: console.log,
    });
  }
}

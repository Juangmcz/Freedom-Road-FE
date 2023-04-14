import { Component, Input } from '@angular/core';
import { PurchaseOrder } from 'src/app/models/purchase-order.model';
import { PurchaseOrderService } from 'src/app/services/purchase-order-service/purchase-order.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent {
  @Input() purchaseOrder: PurchaseOrder = {
    userId: '',
    status: '',
    total: 0,
    purchaseDate: new Date(),
    numberOfPassengers: 0,
  };

  constructor(private service: PurchaseOrderService) {}

  cancelOrder() {
    this.purchaseOrder.status = 'CANCELLED';
    this.service
      .update(this.purchaseOrder.id || ' ', this.purchaseOrder)
      .subscribe({
        next: (purchaseOrder) => {
          console.log(purchaseOrder);
        },
        error: console.log,
        complete: console.log,
      });
  }
}

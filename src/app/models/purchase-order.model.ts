export interface PurchaseOrder {
  id?: string;
  userId: string;
  status?: string;
  total?: number;
  purchaseDate?: Date;
  numberOfPassengers?: number;
}

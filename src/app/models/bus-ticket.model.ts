export interface BusTicket {
  id?: string;
  origin: string;
  destination: string;
  imageUrl?: string;
  price: number;
  numberOfTickets?: number;
}

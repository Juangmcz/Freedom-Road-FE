import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BusTicket } from 'src/app/models/bus-ticket.model';

@Injectable({
  providedIn: 'root',
})
export class BusTicketService {
  constructor(private http: HttpClient) {}

  api: string = 'http://localhost:8080/api/bustickets';

  getAll(): Observable<any> {
    return this.http.get(this.api);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }

  save(busTicket: BusTicket): Observable<any> {
    return this.http.post(this.api, busTicket);
  }

  update(id: string, busTicket: BusTicket): Observable<any> {
    return this.http.put(`${this.api}/${id}`, busTicket);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}

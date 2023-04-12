import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from 'src/app/models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  api: string = 'http://localhost:8080/api/customers';

  getAll(): Observable<any> {
    return this.http.get(this.api);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }

  getByEmail(email: string): Observable<any> {
    return this.http.get(`${this.api}/email/${email}`);
  }

  save(customer: Customer): Observable<any> {
    return this.http.post(this.api, customer);
  }

  update(id: string, customer: Customer): Observable<any> {
    return this.http.put(`${this.api}/${id}`, customer);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}

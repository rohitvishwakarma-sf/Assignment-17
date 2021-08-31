import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Customer } from '../customer.model';
import { baseURL } from '../globals';
import { ICRUD } from '../ICRUD';

@Injectable({
  providedIn: 'root',
})
export class CustomersService implements ICRUD<Customer> {
  private isFetched: boolean = false;
  customerChanged = new EventEmitter<Customer[]>();
  customers: Customer[] = [];
  constructor(private http: HttpClient) {}
  create(obj: Customer): Promise<Customer> {
    throw new Error('Method not implemented.');
  }
  async getAll(): Promise<Customer[]> {
    const url = `${baseURL}/customers?filter[include][]=users`;
    this.customers = await this.http.get<Customer[]>(url).toPromise();
    return this.customers.slice();
  }
  getOneBy(id: number): Promise<Customer> {
    throw new Error('Method not implemented.');
  }
  delete(obj: Customer): Observable<any> {
    throw new Error('Method not implemented.');
  }
  save(obj: Customer): Observable<any> {
    const url = `${baseURL}/customers/${obj.id}`;
    const cust = {
      ...obj,
      users: undefined,
      createdOn: undefined,
      modifiedOn: undefined,
    };
    return this.http.patch(url, cust);
  }
}

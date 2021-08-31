import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { baseURL } from '../globals';
import { ICRUD } from '../ICRUD';
import { User } from '../user.model';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersService implements ICRUD<User> {
  usersChanged = new EventEmitter<User[]>();
  users: User[] = [];
  private isFetched = false;
  constructor(private http: HttpClient) {}

  // fetch users
  async getAll(force: boolean = false): Promise<User[]> {
    if (force || this.isFetched === false) {
      const url = `${baseURL}/users?filter[include][]=customer&filter[include][]=roles`;
      this.users = await this.http.get<User[]>(url).toPromise();
    }
    return this.users.slice();
  }

  async getOneBy(id: number): Promise<User> {
    throw new Error('Method not implemented.');
  }

  // create new user
  create(obj: User): Promise<User> {
    throw new Error('Method not implemented.');
  }

  // deleting user
  delete(user: User): Observable<any> {
    const url = `${baseURL}/users/${user.id}`;
    return this.http.delete<string>(url).pipe(
      map(() => {
        const index = this.users.findIndex((u) => u.id === user.id);
        this.users.splice(index, 1);
        this.usersChanged.emit(this.users.slice());
      })
    );
  }

  // update user
  save(obj: User): Observable<any> {
    const url = `${baseURL}/users/${obj.id}`;
    const user = {
      ...obj,
      customer: undefined,
      roles: undefined,
      createdOn: undefined,
      modifiedOn: undefined,
    };

    return this.http.patch(url, user);
  }

  async login() {
    const body = {
      email: 'rohit@gmail.com',
      password: 'password',
    };
    const token = await this.http
      .post(`${baseURL}/users/login`, body)
      .toPromise();
    console.log(`token is ${token}`);
  }
}

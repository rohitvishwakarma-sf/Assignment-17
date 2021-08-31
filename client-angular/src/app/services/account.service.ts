import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../user.model';

class UserAndToken {
  user!: User;
  token!: string;
}

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user') || 'null')
    );
    this.user = this.userSubject.asObservable();
  }
  public get userValue(): User {
    return this.userSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<UserAndToken>(`${environment.apiUrl}/users/login`, {
        email,
        password,
      })
      .pipe(
        map((data) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', JSON.stringify({ token: data.token }));
          this.userSubject.next(data.user);
          return data;
        })
      );
  }
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    const emptyUser: User = JSON.parse('null');
    this.userSubject.next(emptyUser);
    this.router.navigate(['/account/login']);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/users/signup`, user);
  }
}

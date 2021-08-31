import { Component, OnInit } from '@angular/core';
import { ROLE, User } from './user.model';
import { UsersService } from './users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'client-angular';
  loading = false;
  btnText = 'Load';
  users: User[] = [];
  constructor(private usersService: UsersService) {}
  ngOnInit() {
    this.usersService.usersChanged.subscribe((user) => {
      this.users = user;
    });
  }

  async btnLoadClick() {
    this.loading = true;
    this.btnText = 'Loading...';
    this.users = await this.usersService.getAll();
    this.loading = false;
    this.btnText = 'Refresh';
  }
}

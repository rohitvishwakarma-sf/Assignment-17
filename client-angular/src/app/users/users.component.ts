import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  @Input() users: User[] = [];

  @Input() type: string = 'users';
  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    if (this.type === 'users') {
      this.userService.getAll().then((u) => {
        this.users = u;
      });
    }
  }
  onDelete(id: number) {
    const index = this.users.findIndex((user) => user.id == id);
    this.users.splice(index, 1);
  }
}

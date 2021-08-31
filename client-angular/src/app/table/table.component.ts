import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() users: User[] = [];
  constructor() {}

  ngOnInit(): void {}
  onDelete(i: number) {
    this.users.splice(i, 1);
  }
}

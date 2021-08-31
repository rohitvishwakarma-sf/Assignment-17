import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ROLE, User } from 'src/app/user.model';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: '[app-user-row]',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.css'],
})
export class RowComponent implements OnInit {
  @Input() user!: User;
  private oldUser!: User;
  @Output() onUserDelete = new EventEmitter<number>();
  editMode = false;
  deleting = false;
  saving = false;
  constructor(private usersService: UsersService) {
    this.roleKeys();
  }

  roleKeys(): string[] {
    return Object.keys(ROLE);
  }
  ngOnInit(): void {}

  btnEditClick() {
    this.editMode = true;
    this.oldUser = JSON.parse(JSON.stringify(this.user));
  }
  btnDeleteClick() {
    this.deleting = true;
    this.usersService.delete(this.user).subscribe(
      null,
      (error) => {
        console.log(error);
      },
      () => {
        this.deleting = false;
        this.onUserDelete.emit(this.user.id);
        console.log('deleted user ' + this.user.firstName);
      }
    );
  }
  btnSaveClick() {
    this.editMode = false;
    this.saving = true;
    this.usersService.save(this.user).subscribe(() => {
      this.saving = false;
    });
  }
  btnCancelClick() {
    this.editMode = false;
    this.user = JSON.parse(JSON.stringify(this.oldUser));
  }
}

/// Up NoSymbol Up

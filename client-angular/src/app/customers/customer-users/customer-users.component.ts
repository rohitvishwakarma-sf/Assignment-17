import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterPreloader } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../user.model';
import { UsersService } from '../../users/users.service';
import { UsersComponent } from '../../users/users.component';

@Component({
  selector: 'app-customer-users',
  template: '',
})
export class CustomerUsersComponent implements OnInit {
  @Input() customerUsers: User[] = [];
  private customerId!: number;
  constructor(
    private ngbModal: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  async ngOnInit() {
    this.customerId = +this.route.snapshot.params['id'];
    const users: User[] = await this.usersService.getAll();
    this.customerUsers = users.filter(
      (u) => u.customer!.id === this.customerId
    );

    const usersDialog = this.ngbModal.open(UsersComponent, {
      size: 'xl',
      centered: true,
    });
    usersDialog.componentInstance.type = 'customers';
    usersDialog.componentInstance.users = this.customerUsers;

    usersDialog.result.then(
      (result) => {
        this.router.navigateByUrl('/customers');
      },
      (reason) => {
        this.router.navigateByUrl('/customers');
      }
    );
    this.usersService.usersChanged.subscribe((users) => {
      this.onUserDataChange(users);
    });
  }

  onUserDataChange(users: User[]) {
    this.customerUsers = users.filter(
      (u) => u.customer!.id === this.customerId
    );
  }
}

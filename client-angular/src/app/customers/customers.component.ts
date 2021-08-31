import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from '../customer.model';
import { CustomersService } from './customers.service';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  @Input() customers: Customer[] = [];
  // @ViewChild('customerusersmodal') public customerUsersRef!: TemplateRef<any>;
  constructor(private customerService: CustomersService) {}

  ngOnInit(): void {
    this.customerService.getAll().then((cstmers) => {
      this.customers = cstmers;
    });
  }
  onDelete(index: number) {
    this.customers.splice(index, 1);
  }
  onShowUserHandler(customerId: number) {}
}

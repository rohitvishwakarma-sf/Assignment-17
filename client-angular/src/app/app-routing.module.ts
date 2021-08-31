import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerUsersComponent } from './customers/customer-users/customer-users.component';
import { CustomersComponent } from './customers/customers.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './services/auth.guard';
import { UsersComponent } from './users/users.component';

const accountModule = () =>
  import('./account/account.module').then((x) => x.AccountModule);

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [AuthGuard],
    children: [{ path: ':id/users', component: CustomerUsersComponent }],
  },
  { path: 'account', loadChildren: accountModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

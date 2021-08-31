import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { RowComponent } from './users/user-row/userrow.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsersService } from './users/users.service';
import { Route } from '@angular/compiler/src/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { CustomersComponent } from './customers/customers.component';
import { HomeComponent } from './home/home.component';
import { CustomerRowComponent } from './customers/customer-row/customer-row.component';
import { CustomerUsersComponent } from './customers/customer-users/customer-users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from './_helper/alert/alert.component';
import { JwtInterceptor } from './services/jwt-interceptor';
import { ErrorInterceptor } from './services/error.interceptor';

// const appRoutes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'users', component: UsersComponent },
//   {
//     path: 'customers',
//     component: CustomersComponent,
//     children: [{ path: ':id/users', component: CustomerUsersComponent }],
//   },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
// ];

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    RowComponent,
    UsersComponent,
    CustomersComponent,
    HomeComponent,
    CustomerRowComponent,
    CustomerUsersComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    UsersService,
    NgbModal,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

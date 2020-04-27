import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { ItemCreateComponent } from './items/item-create/item-create.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemDetailsComponent } from './items/item-details/item-details.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { CartComponent } from './cart/cart/cart.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { ResetComponent } from './auth/reset/reset.component';
import { ResetPasswordFormComponent } from './auth/reset-password-form/reset-password-form.component';
import { OrdersComponent } from './cart/orders/orders.component';
import { NavigationComponent } from './items/navigation/navigation.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ItemsListComponent,
    ItemCreateComponent,
    ItemDetailsComponent,
    SignupComponent,
    LoginComponent,
    ResetComponent,
    ResetPasswordFormComponent,
    CartComponent,
    PageNotFoundComponent,
    OrdersComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthRoutingModule,
    // AuthModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

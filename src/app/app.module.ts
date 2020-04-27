import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { CartComponent } from './cart/cart/cart.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { OrdersComponent } from './cart/orders/orders.component';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    PageNotFoundComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthRoutingModule,
    ItemsModule,
    AuthModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

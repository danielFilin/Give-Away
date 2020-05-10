import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [
    CartComponent,
    OrdersComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    OrdersRoutingModule,
    CommonModule
  ]
})

export class CartModule {}

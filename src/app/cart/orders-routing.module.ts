import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from '../auth/auth.guard';
import { OrdersComponent } from './orders/orders.component';


const routes: Routes = [
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]

})

export class OrdersRoutingModule {}

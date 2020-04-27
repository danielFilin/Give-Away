import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemCreateComponent } from './items/item-create/item-create.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { ItemDetailsComponent } from './items/item-details/item-details.component';
import { CartComponent } from './cart/cart/cart.component';
import { AuthGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { OrdersComponent } from './cart/orders/orders.component';
import { NavigationComponent } from './items/navigation/navigation.component';

const routes: Routes = [
  { path: 'item-create', component: ItemCreateComponent, canActivate: [AuthGuard]},
  { path: 'edit/:itemId', component: ItemCreateComponent, canActivate: [AuthGuard]},
  { path: 'item-list', component: ItemsListComponent},
  { path: 'item-details/:itemId', component: ItemDetailsComponent},
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
  { path: 'veiw-settings', component: NavigationComponent, canActivate: [AuthGuard]},
 // { path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
];

// const routes: Routes = [
//   { path: '', component: BooksListComponent },
//   { path: 'create', component: BookCreateComponent, canActivate: [AuthGuard]},
//   { path: 'edit/:bookId', component: BookCreateComponent, canActivate: [AuthGuard]},
//   { path: 'details/:bookId', component: DetailedBookComponent, canActivate: [AuthGuard]},
//   { path: 'veiw-settings', component: PageViewComponent, canActivate: [AuthGuard]},
//   { path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

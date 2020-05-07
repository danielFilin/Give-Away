import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemCreateComponent } from './items/item-create/item-create.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { ItemDetailsComponent } from './items/item-details/item-details.component';
import { CartComponent } from './cart/cart/cart.component';
import { AuthGuard } from './auth/auth.guard';
import { OrdersComponent } from './cart/orders/orders.component';
import { NavigationComponent } from './items/navigation/navigation.component';
import { HomeComponent } from './items/home/home.component';
import { CategoryCreateComponent } from './admin/category-create/category-create.component';
import { CategoriesListComponent } from './admin/categories-list/categories-list.component';

const routes: Routes = [
  { path: 'item-create', component: ItemCreateComponent, canActivate: [AuthGuard]},
  { path: 'edit/:itemId', component: ItemCreateComponent, canActivate: [AuthGuard]},
  { path: 'item-list', component: ItemsListComponent},
  { path: 'item-list/:category/:price', component: ItemsListComponent},
  { path: 'item-list/:category', component: ItemsListComponent},
  { path: 'item-details/:itemId', component: ItemDetailsComponent},
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
  { path: 'veiw-settings', component: NavigationComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent},
  { path: 'admin/category-create', component: CategoryCreateComponent},
  { path: 'admin/edit/:id', component: CategoryCreateComponent},
  { path: 'admin/categories-list', component: CategoriesListComponent},
 // { path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

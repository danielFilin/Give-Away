import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemCreateComponent } from './items/item-create/item-create.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { ItemDetailsComponent } from './items/item-details/item-details.component';
import { AuthGuard } from './auth/auth.guard';
import { NavigationComponent } from './items/navigation/navigation.component';
import { HomeComponent } from './items/home/home.component';

const routes: Routes = [
  { path: 'item-create', component: ItemCreateComponent, canActivate: [AuthGuard]},
  { path: 'edit/:itemId', component: ItemCreateComponent, canActivate: [AuthGuard]},
  { path: 'item-list', component: ItemsListComponent},
  { path: 'item-list/:category/:price', component: ItemsListComponent},
  { path: 'item-list/:category', component: ItemsListComponent},
  { path: 'item-details/:itemId', component: ItemDetailsComponent},
  { path: 'veiw-settings', component: NavigationComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent},
 // { path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

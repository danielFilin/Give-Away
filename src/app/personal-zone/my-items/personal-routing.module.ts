import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyItemsComponent } from './my-items.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { PageNotFoundComponent } from 'src/app/error/page-not-found/page-not-found.component';
import { MyFavoritesComponent } from '../my-favorites/my-favorites.component';


const routes: Routes = [
  { path: 'my-items', component: MyItemsComponent, canActivate: [AuthGuard]},
  { path: 'my-favorites', component: MyFavoritesComponent, canActivate: [AuthGuard]},
  { path: 'not-found', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/not-found'},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]

})

export class PersonalRoutingModule {}

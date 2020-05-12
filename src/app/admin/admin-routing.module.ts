import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AllItemsComponent } from './all-items/all-items.component';

const routes: Routes = [
  { path: 'admin/category-create', component: CategoryCreateComponent},
  { path: 'admin/edit/:id', component: CategoryCreateComponent},
  { path: 'admin/users-list', component: ManageUsersComponent},
  { path: 'admin/categories-list', component: CategoriesListComponent},
  { path: 'admin/items-list', component: AllItemsComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]

})

export class AdminRoutingModule {}

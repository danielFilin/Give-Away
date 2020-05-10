import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';

const routes: Routes = [
  { path: 'admin/category-create', component: CategoryCreateComponent},
  { path: 'admin/edit/:id', component: CategoryCreateComponent},
  { path: 'admin/categories-list', component: CategoriesListComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]

})

export class AdminRoutingModule {}

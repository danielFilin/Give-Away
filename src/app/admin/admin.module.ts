import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AllItemsComponent } from './all-items/all-items.component';

@NgModule({
  declarations: [
    CategoriesListComponent,
    CategoryCreateComponent,
    ManageUsersComponent,
    AllItemsComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    CommonModule
  ]
})

export class AdminModule {}

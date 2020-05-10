import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    CategoriesListComponent,
    CategoryCreateComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    CommonModule
  ]
})

export class AdminModule {}

import { NgModule } from '@angular/core';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemCreateComponent } from './item-create/item-create.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    ItemsListComponent,
    ItemCreateComponent,
    ItemDetailsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ]

})

export class ItemsModule {}

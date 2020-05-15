import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonalRoutingModule } from './personal-routing.module';
import { MyItemsComponent } from './my-items/my-items.component';
import { BrowserModule } from '@angular/platform-browser';
import { MyFavoritesComponent } from './my-favorites/my-favorites.component';
import { InfoModalComponent } from '../shared/info-modal/info-modal.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MyItemsComponent,
    MyFavoritesComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PersonalRoutingModule,
    CommonModule,
    BrowserModule,
    SharedModule
  ]
})

export class PersonalModule {}

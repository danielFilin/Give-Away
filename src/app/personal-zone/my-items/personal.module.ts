import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonalRoutingModule } from './personal-routing.module';
import { MyItemsComponent } from './my-items.component';


@NgModule({
  declarations: [
    MyItemsComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PersonalRoutingModule,
    CommonModule
  ]
})

export class PersonalModule {}

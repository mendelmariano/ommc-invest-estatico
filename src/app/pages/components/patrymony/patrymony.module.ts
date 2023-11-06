import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatrymonyRoutingModule } from './patrymony-routing.module';
import { PatrymonyCrudComponent } from './patrymony-crud/patrymony-crud.component';


@NgModule({
  declarations: [
    PatrymonyCrudComponent
  ],
  imports: [
    CommonModule,
    PatrymonyRoutingModule
  ],
  exports:  [
    PatrymonyCrudComponent
  ]
})
export class PatrymonyModule { }

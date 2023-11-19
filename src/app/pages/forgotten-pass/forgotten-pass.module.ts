import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgottenPassPageRoutingModule } from './forgotten-pass-routing.module';

import { ForgottenPassPage } from './forgotten-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgottenPassPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ForgottenPassPage]
})
export class ForgottenPassPageModule {}

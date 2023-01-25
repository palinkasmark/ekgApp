import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientPageRoutingModule } from './patient-routing.module';

import { PatientPage } from './patient.page';
import { RouterModule, Routes } from '@angular/router';

/* const routes: Routes = [
  {
    path: '',
    component: PatientPage
  }
]; */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientPageRoutingModule
    //RouterModule.forChild(routes)

  ],
  declarations: [PatientPage]
})
export class PatientPageModule {}

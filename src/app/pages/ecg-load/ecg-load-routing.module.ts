import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EcgLoadPage } from './ecg-load.page';

const routes: Routes = [
  {
    path: '',
    component: EcgLoadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EcgLoadPageRoutingModule {}

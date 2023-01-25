import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EkgTesztPage } from './ekg-teszt.page';

const routes: Routes = [
  {
    path: '',
    component: EkgTesztPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EkgTesztPageRoutingModule {}

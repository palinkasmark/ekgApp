import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EcgChartPage } from './ecg-chart.page';

const routes: Routes = [
  {
    path: '',
    component: EcgChartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EcgChartPageRoutingModule {}

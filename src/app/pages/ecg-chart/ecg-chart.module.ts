import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EcgChartPageRoutingModule } from './ecg-chart-routing.module';

import { EcgChartPage } from './ecg-chart.page';
import { EkgService } from 'src/app/services/ekg.service';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EcgChartPageRoutingModule,
    HighchartsChartModule
  ],
  providers: [EkgService],
  declarations: [EcgChartPage]
})
export class EcgChartPageModule {}

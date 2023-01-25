import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EcgLoadPageRoutingModule } from './ecg-load-routing.module';

import { EcgLoadPage } from './ecg-load.page';

import { EkgService } from 'src/app/services/ekg.service';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EcgLoadPageRoutingModule,
    HighchartsChartModule
  ],
  providers: [EkgService],
  declarations: [EcgLoadPage]
})
export class EcgLoadPageModule {}

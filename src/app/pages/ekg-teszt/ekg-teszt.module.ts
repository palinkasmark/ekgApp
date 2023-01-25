import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EkgTesztPageRoutingModule } from './ekg-teszt-routing.module';

import { EkgTesztPage } from './ekg-teszt.page';


import { NgxEchartsModule } from 'ngx-echarts';

import * as echarts from 'echarts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EkgTesztPageRoutingModule,
     NgxEchartsModule,
    NgxEchartsModule.forRoot({ echarts })
  ],
  declarations: [EkgTesztPage]
})
export class EkgTesztPageModule {}

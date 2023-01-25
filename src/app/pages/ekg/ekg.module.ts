import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EkgPageRoutingModule } from './ekg-routing.module';

import { EkgPage } from './ekg.page';

import { NgxEchartsModule } from 'ngx-echarts';

import * as echarts from 'echarts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EkgPageRoutingModule,
    NgxEchartsModule,
    NgxEchartsModule.forRoot({ echarts })
  ],
  providers: [],
  declarations: [EkgPage]
})
export class EkgPageModule {}

import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import HStockTools from 'highcharts/modules/stock-tools';
HStockTools(Highcharts);
import indicatorsAll from "highcharts/indicators/indicators-all";
import annotationsAdvanced from "highcharts/modules/annotations-advanced";
import priceIndicator from "highcharts/modules/price-indicator";
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { EkgService } from 'src/app/services/ekg.service';
import { interval } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
indicatorsAll(Highcharts);
annotationsAdvanced(Highcharts);
priceIndicator(Highcharts);

@Component({
  selector: 'app-ecg-load',
  templateUrl: './ecg-load.page.html',
  styleUrls: ['./ecg-load.page.scss'],
})
export class EcgLoadPage implements OnInit {
  url: any;
  Highcharts:  typeof Highcharts = Highcharts;;
  chartOptions: Highcharts.Options;
  currentPatient: any;
  
  constructor(
    private route: ActivatedRoute, private loadingController: LoadingController,
    public ekgService: EkgService, private authService: AuthService
  ) {  }

   ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.url = this.route.snapshot.paramMap.get('url');
    });
    this.currentPatient = this.authService.currentPatient;

    this.loadingController
      .create({
        message: "Loading...",
      })
      .then((loadingEl) => {
        loadingEl.present().then(() => {
          // this.currentPatient = this.authService.currentPatient;
          // this.ekgService.getAllEcgData();
          this.ekgService.processData(this.url);

          this.ekgService.records();

          this.ekgService.loadRecord(this.url);


          const subscription = interval(1000).subscribe((n) => {
            // this.url = this.ekgService.getEcg();
            if (this.url != undefined) {
              if (this.ekgService.selectPointReady == true) {
                let pointReady = this.ekgService.pointReady;
                // if (this.ekgService.loadChartReady == true) {
                  this.chartOptions = this.ekgService.loadChart(pointReady);
                // }
                loadingEl.dismiss();
                this.ekgService.selectPointReady = false;
                subscription.unsubscribe();
              }
              // this.ekgService.processData(this.url);
              // this.isChart = true;
              // this.kesz = false;
            }
          });
        });
      });
  }

  ionViewWillLeave(){
    this.ekgService.loadChartReady = false;
    console.log( this.ekgService.loadChartReady)
  }

}

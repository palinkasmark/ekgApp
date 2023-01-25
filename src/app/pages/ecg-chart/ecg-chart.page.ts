import { Component, OnInit } from '@angular/core';
import { EkgService } from 'src/app/services/ekg.service';
import * as Highcharts from "highcharts/highstock";
import { LoadingController } from '@ionic/angular';
import { interval } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import HStockTools from 'highcharts/modules/stock-tools';
HStockTools(Highcharts);
import indicatorsAll from "highcharts/indicators/indicators-all";
import annotationsAdvanced from "highcharts/modules/annotations-advanced";
import priceIndicator from "highcharts/modules/price-indicator";
indicatorsAll(Highcharts);
annotationsAdvanced(Highcharts);
priceIndicator(Highcharts);

@Component({
  selector: 'app-ecg-chart',
  templateUrl: './ecg-chart.page.html',
  styleUrls: ['./ecg-chart.page.scss'],
})
export class EcgChartPage implements OnInit {
  Highcharts:  typeof Highcharts = Highcharts;;
  chartOptions: Highcharts.Options;
  fullChartOptions: Highcharts.Options;
  isChart: boolean;
  kesz: boolean;
  currentPatient: any;
  url: any;
  saveDone: boolean;
  

  constructor(private router: Router, private db: AngularFirestore, private route: ActivatedRoute, private authService: AuthService, public ekgService: EkgService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.authService.getPatient(paramMap.get('patientId'));
    });

    this.loadingController
      .create({
        message: "Loading...",
      })
      .then((loadingEl) => {
        loadingEl.present().then(() => {
          this.currentPatient = this.authService.currentPatient;
          // console.log("Current patient: ", this.currentPatient);
          this.ekgService.getAllEcgData();
          const subscription = interval(1000).subscribe((n) => {
            this.url = this.ekgService.getEcg();
            console.log(this.url);
            console.log(this.ekgService.ecgArray);
            if (this.url != undefined) {
              //  this.ekgService.processData(
              //   'https://docs.google.com/spreadsheets/d/e/2PACX-1vR73gKau6D4RBTZyiZieAQJUyyX56EeBxxe-giCnqpO1-zLsXjAtPZMJC2CAHwcjdEb4P3tde5UVW0r/pub?gid=1751011686&single=true&output=csv'
              // );
              this.ekgService.processData(this.url);
              this.isChart = true;
              this.kesz = false;
              if (this.isChart == true && this.kesz == false) {
                this.chartOptions = this.ekgService.setChartOptions();
              }
              loadingEl.dismiss();
              subscription.unsubscribe();
            }
          });
        });
      });
  }

  saveRecord(){
    let option = undefined;
    var currentdate = new Date();
    var datetime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " - " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    this.loadingController
    .create({
      message: "Loading...",
    })
    .then((loadingEl) => {
      loadingEl.present().then(() => {
      option = this.ekgService.setFullChart();
        const subscription = interval(1000).subscribe((n) => {
          if(option != undefined) {
            this.chartOptions = option;
            var pointIndex = this.ekgService.selectPoints[0][0]; //index
            var pointX = this.ekgService.selectPoints[0][1]; //x
            var pointY = this.ekgService.selectPoints[0][2]; //y
            let pointOption = this.ekgService.selectPoints[0][3];
            for(let i = 1; i < this.ekgService.selectPoints.length; i++) {
              pointIndex = pointIndex + ',' + this.ekgService.selectPoints[i][0];
              pointX = pointX + ',' + this.ekgService.selectPoints[i][1];
              pointY = pointY + ',' + this.ekgService.selectPoints[i][2];
              pointOption = pointOption + ',' + this.ekgService.selectPoints[i][3];
            }
            if(this.ekgService.selectPoints.length != 0) {
              this.db
              .collection("users")
              .doc(`${this.currentPatient.doctorId}`)
              .collection("patients")
              .doc(`${this.currentPatient.uid}`)
              .update({
                records: firebase.default.firestore.FieldValue.arrayUnion(
                  {
                    index: pointIndex,
                    x: pointX,
                    y: pointY,
                    o: pointOption,
                    url: this.ekgService.url,
                    date: datetime
                  }
                 )
              });
            }
            this.saveDone = true;
            this.getAllRecord();
            this.router.navigate(['/patient-data/' + this.currentPatient.uid]);
            loadingEl.dismiss();
            subscription.unsubscribe();
          }
          
        
        });
      });
    });
  }

 getAllRecord(){
   this.ekgService.getAllRecord();
 }

  paused(){
    return this.ekgService.paused();
  }
  play(){
    return this.ekgService.play();
  }

  skip() {
    this.kesz = true;
    this.isChart = false;

    this.loadingController
      .create({
        message: 'Loading...',
      })
      .then((loadingEl) => {
        loadingEl.present().then(() => {
          this.ekgService.getAllEcgData();
          const subscription = interval(1000).subscribe((n) => {
            this.url = this.ekgService.getEcg();
            if (this.url != undefined) {
              //  this.ekgService.processData(
              //   'https://docs.google.com/spreadsheets/d/e/2PACX-1vR73gKau6D4RBTZyiZieAQJUyyX56EeBxxe-giCnqpO1-zLsXjAtPZMJC2CAHwcjdEb4P3tde5UVW0r/pub?gid=1751011686&single=true&output=csv'
              // );
              this.ekgService.processData(this.url);
              if(this.isChart == false && this.kesz == true){
               this.chartOptions = this.ekgService.setFullChart();
              }
              loadingEl.dismiss();
             subscription.unsubscribe();
            }
          });
        });
      });
  }

  
  p(){
    this.ekgService.p();
  }
  t(){
    this.ekgService.t();
  }
  qrs(){
    this.ekgService.qrs();
  }
  st(){
    this.ekgService.st();
  }
  u(){
    this.ekgService.u();
  }

}

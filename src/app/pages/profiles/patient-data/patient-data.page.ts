import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { SegmentChangeEventDetail } from '@ionic/core';
import { EkgService } from 'src/app/services/ekg.service';
import { interval } from 'rxjs';


@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.page.html',
  styleUrls: ['./patient-data.page.scss'],
})
export class PatientDataPage implements OnInit {

  info: any;
  option: boolean;
  selectButton: string;
  currentUser: any;
  allRecords: any;
  // recordDatas: any[]= [];
  recordDatas: any;

  constructor(public authService: AuthService,  private loadingCtrl: LoadingController, private route: ActivatedRoute, private ekgService: EkgService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.authService.getPatient(paramMap.get('patientId'));
    })

    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Loading...' })
    .then(loadingEl => {
      loadingEl.present();
      //Adatok megjelenitese
      setTimeout(() => {
        this.info = this.authService.currentPatient;
        loadingEl.dismiss();
      }, 1800);
    });
    
  } 
  
  ionViewWillEnter() {
    this.selectButton = 'info';
  }

  ionViewDidEnter() {
    this.option  = true;
 
    // Ujratoltodes nelkul uj orvos/patient-data adatai jelenjenek meg login(signup) után meg patient-datanal
    this.info = this.authService.currentPatient;
    // this.recordDatas = [];
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Loading...' })
    .then(loadingEl => {
      loadingEl.present().then(() => {
        const sub = interval(1000).subscribe(() => {
          this.recordDatas = this.ekgService.records();
          if(this.recordDatas != undefined) {
            // console.log(this.recordDatas);
            loadingEl.dismiss();
            sub.unsubscribe();
          }
        });
      });
    });
   }

  patientInfo(event: CustomEvent<SegmentChangeEventDetail>) {
    
    if( event.detail.value === 'info' ) {
      this.option = true;
      this.info = this.authService.currentPatient;
    }else{
      this.option = false;
      // Get Records this.info = this.authService.getPatients();
    }
  }
}

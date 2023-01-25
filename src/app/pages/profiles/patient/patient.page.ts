import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { SegmentChangeEventDetail } from '@ionic/core';
import { interval } from 'rxjs';
import { EkgService } from 'src/app/services/ekg.service';

@Component({
  selector: "app-patient",
  templateUrl: "./patient.page.html",
  styleUrls: ["./patient.page.scss"],
})
export class PatientPage {
  info: any;
  option: boolean;
  myAndDoctorData: boolean;
  selectButton: string;
  selectInfo: string;

  allRecords: any;
  // recordDatas: any[]= [];
  recordDatas: any;

  constructor(
    public authService: AuthService,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute, private ekgService: EkgService
  ) {}

  ngOnInit() {
    this.authService.getPatient('lcIdyH3axZigtqqp2IvB');
    setTimeout(() => {
      console.log(this.authService.currentPatient)
    }, 2000);
    if(this.authService.currentPatient == null) {
      this.authService.currentPatient = JSON.parse(localStorage.getItem('currentPatient'));
      this.authService.currentPatDocName = JSON.parse(localStorage.getItem('currentPatDocName'));
      this.authService.currentPatDocEmail = JSON.parse(localStorage.getItem('currentPatDocEmail'));
      this.authService.currentPatDocPhoneNumber = JSON.parse(localStorage.getItem('currentPatDocPhoneNumber'));
      this.authService.currentPatDocMedical = JSON.parse(localStorage.getItem('currentPatDocMedical'));
    }
    console.log(this.authService.currentPatDocEmail);
    this.loadingCtrl
      .create({ keyboardClose: true, message: "Loading..." })
      .then((loadingEl) => {
        loadingEl.present();
        setTimeout(() => {
          this.info = this.authService.currentPatient;
          loadingEl.dismiss();
        }, 1500);
      });
  }

  ionViewWillEnter() {
    this.option  = true;
    this.myAndDoctorData = true;
    this.selectButton = 'info';
    this.selectInfo = 'patientInfo';
  }

  ionViewDidEnter() {
     this.option  = true;
    // Ujratoltodes nelkul uj orvos adatai jelenjenek meg login(signup) után
    this.info = this.authService.currentPatient;

    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Loading...' })
    .then(loadingEl => {
      loadingEl.present().then(() => {
        const sub = interval(1000).subscribe(() => {
          this.recordDatas = this.ekgService.records();
          if(this.recordDatas != undefined) {
            loadingEl.dismiss();
            sub.unsubscribe();
          }
        
        });
      });
      
   
    });
  
  }

  patientInfo(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === "info") {
      this.option = true;
      this.info = this.authService.currentPatient;
    } else {
      this.option = false;
      // Get Records this.info = this.authService.getPatients();
    }
  }

  MyDoctorInfo(event: CustomEvent<SegmentChangeEventDetail>) {

    if (event.detail.value === "patientInfo") {
      this.myAndDoctorData = true;
      this.info = this.authService.currentPatient;
    } else if ( event.detail.value === 'myDoctorInfo') {
      this.myAndDoctorData = false;
    }

    console.log(this.option, this.myAndDoctorData);
  }
}

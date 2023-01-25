import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.page.html',
  styleUrls: ['./doctors.page.scss'],
})
export class DoctorsPage implements OnInit {
  info: any;
  option: boolean;
  selectButton: string;
  patient: User;
  patientSub: Subscription;

  constructor(
    public authService: AuthService,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Loading...' })
    .then(loadingEl => {
      loadingEl.present();
      setTimeout(() => {
        this.info = this.authService.currUser;
        loadingEl.dismiss();
      }, 1200);
    });
    
  }

  getPatient(){
    this.route.paramMap.subscribe(paramMap => {
      this.authService.getPatient(paramMap.get('patientId'));
    })
  }

  ionViewWillEnter() {
    this.option  = true;
    this.selectButton = 'info';
    //Patient hozzaadas utan egybol megjelenjen az uj patient, ne kelljen frissíteni
    /* if(this.option == false) {
      this.info = this.authService.getPatients();
    } */
    //this.info = this.authService.currUser;
  }

  ionViewDidEnter() {
    this.option  = true;
     // Ujratoltodes nelkul uj orvos adatai jelenjenek meg login(signup) után
      this.info = this.authService.currUser;
  }


  ionViewWillLeave() {
    this.option  = true;
  }
  ionViewDidLeave() {
    this.option  = true;
  }
  
  

  doctorInfo(event: CustomEvent<SegmentChangeEventDetail>) {
    if( event.detail.value === 'info' ) {
      this.option = true;
      this.info = this.authService.currUser;
    }else{
      this.option = false;
      this.info = this.authService.getPatients();
    }
  }

 

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    //this.patientSub.unsubscribe();
    console.log('Destroy');
  }

}

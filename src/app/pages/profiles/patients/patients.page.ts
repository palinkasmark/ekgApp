import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {

  gender: any;
  isEnabled: boolean = false;

  constructor(
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    
  }


  onSubmit(addPatientForm: NgForm) {
   // const password = addPatientForm.value.password;

    let birthDate = new Date(addPatientForm.value.birthDate);
    let formatDate = this.datePipe.transform(birthDate, 'yyyy-MM-dd');

    const user: User = {
      name: addPatientForm.value.name,
      email: addPatientForm.value.email,
      phoneNumber: addPatientForm.value.phoneNumber,
      //age: addPatientForm.value.age,
      birthDate: formatDate,
      gender: this.gender,
      taj: addPatientForm.value.taj
    };

    

 
    this.loadingCtrl.create({
      message: 'Create user...'
    }).then(loadingEl => {
      loadingEl.present();
      setTimeout(() => {
        this.authService.addPatient(user);
          loadingEl.dismiss();
          this.router.navigate(['/doctors']);
      }, 3000);    
    });
   }

   valueChanged(gender) {
    console.log(gender);
   }

}

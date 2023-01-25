import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isPatient = true;


  constructor(
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  onSwitchLogin(){
    this.isPatient = !this.isPatient;
  }

  ionViewWillLeave(){
    this.authService.currUser;
  }

  onSubmit(loginForm: NgForm) {
    if(this.isPatient == false) {
      const password = loginForm.value.password;

      const user: User = {
        name: loginForm.value.name,
        email: loginForm.value.email,
        phoneNumber: loginForm.value.phoneNumber,
        medical: loginForm.value.medical
      };
  
      this.loadingCtrl.create({
        message: 'Logging in...'
      }).then(loadingEl => {
        loadingEl.present();
        this.authService.signIn(
          user, password
         /*  loginForm.value.email,
          loginForm.value.password */
          ).then( () => {
            loadingEl.dismiss();
          }
          );
      });
    }else{
      this.loadingCtrl.create({
        message: 'Logging in...'
      }).then(loadingEl => {
        loadingEl.present();
        this.authService.singInPatient(loginForm.value.email, loginForm.value.taj);
        setTimeout(() => {
          loadingEl.dismiss();
        }, 500);
          
      });
    }
  }

}

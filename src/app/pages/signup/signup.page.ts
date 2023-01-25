import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(signupForm: NgForm) {
    console.log(signupForm.value.name);
   /*  this.loadingCtrl.create({
      message: 'Create user...'
    }).then(loadingEl => {
      loadingEl.present();
      this.authService.signup(
        signupForm.value.email,
        signupForm.value.password
        ).subscribe( () => {
          loadingEl.dismiss();
          this.router.navigate(['/home']);
        }, errRes => {
          console.log(errRes);
          loadingEl.dismiss();
          const code = errRes.error.error.message;
          let message = 'Could not sign up, please try again.';
          if(code === 'EMAIL_EXISTS') {
            message = 'The email address exists already.';
          }else if(code === 'WEAK_PASSWORD') {
            message = 'Password should be at least 6 characters';
          }else if(code === 'INVALID_EMAIL') {
            message = 'Invalid email.';
          }
          this.authService.showAlert(message);
        });
    }); */

    const password = signupForm.value.password;

    const user: User = {
      name: signupForm.value.name,
      email: signupForm.value.email,
      phoneNumber: signupForm.value.phoneNumber,
      medical: signupForm.value.medical
    };


    this.loadingCtrl.create({
      message: 'Create user...'
    }).then(loadingEl => {
      loadingEl.present();
      this.authService.signup(user, password
        ).then( () => {
          loadingEl.dismiss();
          //this.router.navigate(['/home']);
        } //, errRes => {
         // console.log(errRes);
          //loadingEl.dismiss();
          /*const code = errRes.error.error.message;
          let message = 'Could not sign up, please try again.';
          if(code === 'EMAIL_EXISTS') {
            message = 'The email address exists already.';
          }else if(code === 'WEAK_PASSWORD') {
            message = 'Password should be at least 6 characters';
          }else if(code === 'INVALID_EMAIL') {
            message = 'Invalid email.';
          }
          this.authService.showAlert(message); */
        //} 
        );
    });
  }

}

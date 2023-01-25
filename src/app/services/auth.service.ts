import { DOCUMENT } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { forkJoin, Subscription } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';
import { delay, map, take, find } from 'rxjs/operators';
import { User } from '../model/user.model';


@Injectable({
  providedIn: "root",
})
export class AuthService {
  currUser: any;
  userData: any; // Save logged in user data
  addPatientSub: Subscription = Subscription.EMPTY; //Ha nem iratkoztunk fel, ne dobjon errort
  tajStatus: boolean;
  tajFinish: boolean;
  tajok: string[] = [];
  currentPatient: any;
  currentPatDocName: any;
  currentPatDocEmail: any;
  currentPatDocPhoneNumber: any;
  currentPatDocMedical: any;

  constructor(
    private db: AngularFirestore,
    public alertCtrl: AlertController,
    private afAuth: AngularFireAuth,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {
    //       /* Saving user data in localstorage when
    //       logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        //console.log(this.userData);
        localStorage.setItem("user", JSON.stringify(this.userData)); // stringify convert to string
        JSON.parse(localStorage.getItem("user")); // parse convert to object
      } else {
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
      }
    });

    this.afAuth.authState.subscribe((authUser) => {
      if (authUser) {
        this.db
          .doc(`users/${authUser.uid}`)
          .get()
          .subscribe((t) => {
            const userData: User = {
              name: t.get("name"),
              email: t.get("email"),
              phoneNumber: t.get("phoneNumber"),
              medical: t.get("medical"),
            };
            this.currUser = userData;
            console.log("Current User: ", this.currUser);
          });

        this.router.navigate(["/doctors"]);
      }
    });
  }

  getPatient(id: string): any {
    this.afAuth.authState.subscribe((authUser) => {
      if (authUser) {
        const currentUID = authUser.uid;

        this.db
          .collection("users")
          .doc(`${currentUID}`)
          .collection("patients")
          .doc(id)
          .get()
          .subscribe((patient) => {
            const userData: User = {
              uid: patient.get("uid"),
              name: patient.get("name"),
              email: patient.get("email"),
              phoneNumber: patient.get("phoneNumber"),
              birthDate: patient.get("birthDate"),
              gender: patient.get("gender"),
              taj: patient.get("taj"),
              doctorId: patient.get("doctorId")
            };

            this.currentPatient = userData;
            console.log('Current patient: ', this.currentPatient);
          });
      }
    });
  }

  getPatients() {
    let patientsData: User[] = [];
    this.afAuth.authState.subscribe((authUser) => {
      if (authUser) {
        const currentUID = authUser.uid;
        this.db
          .collection("users")
          .doc(`${currentUID}`)
          .collection("patients")
          .get()
          .subscribe((patient) => {
            patient.forEach((data) => {
              patientsData.push({
                uid: data.get("uid"),
                name: data.get("name"),
                email: data.get("email"),
                phoneNumber: data.get("phoneNumber"),
                medical: data.get("medical"),
              });
            });
          });
      }
    });
    return patientsData;
  }

  checkTaj(user: User) {
    /* let getAllId: string[] = []; */
    this.db
      .collection("users")
      .get()
      .subscribe((doc) => {
        doc.docs.map((doc) => {
          /*   console.log(doc.id, "=>", doc.data());
          getAllId.push(doc.id); */
          this.db
            .collection("users")
            .doc(doc.id)
            .collection("patients")
            .get()
            .subscribe((snap) => {
              snap.forEach((doc) => {
                if (user.taj == doc.get("taj")) {
                  console.log("Ilyen taj mar van");
                  this.tajStatus = false;
                  //this.showAlert('Ilyen taj mar regisztralva van a rendszerben');
                  //this.update();
                }
              });
            });
        });
      });
  }

/*   update(): boolean {
    this.tajFinish = this.tajStatus;
    return this.tajFinish;
  } */

  showAlert(message: string) {
    this.alertCtrl.create({
      header: 'Authentication failed',
      message: message,
      buttons: ['Ok']
    }).then(alertEl => alertEl.present());
  }

  addPatient(user: User) {
    let userId = this.db.createId();
    this.checkTaj(user);
    // Get current uid
    this.addPatientSub = this.afAuth.authState
      .pipe(take(1), delay(2000))
      .subscribe((authUser) => {
        if (authUser) {
          const currentUID = authUser.uid;
          const userRef: AngularFirestoreDocument<any> = this.db.doc(
            `users/${currentUID}/patients/${userId}`
          );
          const userData: User = {
            uid: userId,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            birthDate: user.birthDate,
            gender: user.gender,
            taj: user.taj,
            doctorId: currentUID,
          };
          if (this.tajStatus == false) {
            console.log("Nem adtunk hozza semmit");
            return;
          } else {
            console.log("Hozzadtuk");
            //this.router.navigate(['/doctors']);
            return userRef.set(userData, {
              merge: true,
            });
          }
        }
      });
    this.tajStatus = true;
  }

  setUserData(userD: User, user) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      name: userD.name,
      email: userD.email,
      phoneNumber: userD.phoneNumber,
      medical: userD.medical,
    };
    console.log(userData);
    return userRef.set(userData, {
      merge: true,
    });
  }

  //Signin like patient
  singInPatient(email: string, taj: string): any {
    this.db
      .collection("users")
      .get()
      .subscribe((doc) => {
        doc.docs.map((d) => {
          this.db
            .collection("users")
            .doc(d.id)
            .collection("patients")
            .get()
            .subscribe((snap) => {
              snap.forEach((doc) => {
                if (email == doc.get('email') && taj == doc.get("taj")) {
                  console.log("Van ilyen taj.");

                  const userData: User = {
                    name: doc.get("name"),
                    email: doc.get("email"),
                    phoneNumber: doc.get("phoneNumber"),
                    birthDate: doc.get("birthDate"),
                    gender: doc.get("gender"),
                    taj: doc.get("taj"),
                  };

                  this.currentPatient = userData;
                  this.currentPatDocName = d.get('name');
                  this.currentPatDocEmail = d.get('email');
                  this.currentPatDocPhoneNumber = d.get('phoneNumber');
                  this.currentPatDocMedical = d.get('medical');
                  

                  // this.afAuth.authState.subscribe((user) => {
                  //   if (user) {
//                      this.userData = user;
                      //console.log(this.userData);
                      localStorage.setItem('currentPatient', JSON.stringify(this.currentPatient));
                      localStorage.setItem('currentPatDocName', JSON.stringify(this.currentPatDocName));
                      localStorage.setItem('currentPatDocEmail', JSON.stringify(this.currentPatDocEmail));
                      localStorage.setItem('currentPatDocPhoneNumber', JSON.stringify(this.currentPatDocPhoneNumber));
                      localStorage.setItem('currentPatDocMedical', JSON.stringify(this.currentPatDocMedical));
                      // JSON.parse(localStorage.getItem("user"));
                  //   } else {
                  //     //localStorage.setItem("user", null);
                  //     //JSON.parse(localStorage.getItem("user"));
                  //   }
                  // });

                  this.router.navigate(["/patient"]);
                  return true;
                } else {
                  return false;
                }
              });
            });
        });
      });
  }

  // Sign in with email/password
  signIn(user: User, password) {
    return this.afAuth
      .signInWithEmailAndPassword(user.email, password)
      .then((result) => {
        if (result.user.email == user.email) {
          this.db
            .doc(`users/${result.user.uid}`)
            .get()
            .subscribe((t) => {
              const userData: User = {
                name: t.get("name"),
                email: t.get("email"),
                phoneNumber: t.get("phoneNumber"),
                medical: t.get("medical"),
              };

              this.currUser = userData;
              console.log("Login User: ", this.currUser);
              /* return userRef.set(userData, {
                merge: true
              }) */
            });

          this.router.navigate(["/doctors"]);
        }

        //this.setUserData( user );
      })
      .catch((error) => {
        //window.alert(error.message);
        console.log(error);

        const code = error.code;
        let message = "Could not sign up, please try again.";

        if (code === "auth/invalid-email") {
          message = "Invalid email.";
        } else if (code === "auth/wrong-password") {
          message = "Password is wrong.";
        } else if (code === "auth/user-not-found") {
          message = "User not found.";
        }
        //this.showAlert(message);
      });
  }

  // Sign up with email/password
  signup(user: User, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(user.email, password)
      .then((result) => {
        //          this.setUserDataForSignUp(result.user, name, phoneNumber, medical);
        this.setUserData(user, result.user);
        this.router.navigate(["/doctors"]);
      })
      .catch((error) => {
        /* window.alert(error.message); */
        console.log(error.code);
        console.log(error);

        const code = error.code;
        let message = "Could not sign up, please try again.";

        if (code === "auth/email-already-in-use") {
          message = "The email address exists already.";
        } else if (code === "auth/invalid-password") {
          message = "Password should be at least 6 characters";
        } else if (code === "auth/invalid-email") {
          message = "Invalid email.";
        }
        //  this.showAlert(message);
      });
  }

  //     // Returns true when user is logged in (and email is verified)
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null /* && user.emailVerified !== false */ ? true : false;
  }

  // Sign out
  signOut() {
    //this.addPatientSub.unsubscribe(); //Ne adja hozza mindig ugyanazt a pacienst kijelentkezes, bejelentkezes utan

    return this.afAuth.signOut().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(["/login"]);
    });
  }
}



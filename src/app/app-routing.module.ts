import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'doctors',
    loadChildren: () => import('./pages/profiles/doctors/doctors.module').then( m => m.DoctorsPageModule)
  },
  {
    path: 'patient-data/:patientId',
    loadChildren: () => import('./pages/profiles/patient-data/patient-data.module').then( m => m.PatientDataPageModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'patients',
    loadChildren: () => import('./pages/profiles/patients/patients.module').then( m => m.PatientsPageModule)
  },
  {
    path: 'patient',
    loadChildren: () => import('./pages/profiles/patient/patient.module').then( m => m.PatientPageModule)
  },
  {
    path: 'ekg',
    loadChildren: () => import('./pages/ekg/ekg.module').then( m => m.EkgPageModule)
  },
  {
    path: 'ekg-teszt',
    loadChildren: () => import('./pages/ekg-teszt/ekg-teszt.module').then( m => m.EkgTesztPageModule)
  },
  {
    path: 'ecg-chart/:patientId',
    loadChildren: () => import('./pages/ecg-chart/ecg-chart.module').then( m => m.EcgChartPageModule)
  },
  {
    path: 'ecg-load',
    loadChildren: () => import('./pages/ecg-load/ecg-load.module').then( m => m.EcgLoadPageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

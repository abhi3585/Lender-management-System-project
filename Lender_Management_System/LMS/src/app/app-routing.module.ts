import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './ApplicationComponents/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';

import { BorrowerApplicationFormComponent } from './Borrowers/borrower-application-form/borrower-application-form.component';
import { BorrowerDashboardComponent } from './Borrowers/borrower-dashboard/borrower-dashboard.component';
import { BorrowerLoanDetailsComponent } from './Borrowers/borrower-loan-details/borrower-loan-details.component';
import { LoanEstimationComponent } from './Borrowers/loan-estimation/loan-estimation.component';

import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';

import { LoanConfigureComponent } from './LoanConfiguration/loan-configure/loan-configure.component';
import { LoanCreationComponent } from './LoanConfiguration/loan-creation/loan-creation.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewFormsComponent } from './ApplicationComponents/view-forms/view-forms.component';
import { CheckLoanDetailsComponent } from './Borrowers/check-loan-details/check-loan-details.component';
import { PaymentFormComponent } from './Borrowers/payment-form/payment-form.component';

import { PayHereComponent } from './Borrowers/pay-here/pay-here.component';
import { TrackPaymentsComponent } from './ApplicationComponents/track-payments/track-payments.component';
import { ViewPaymentsComponent } from './ApplicationComponents/view-payments/view-payments.component';
import { PaymentAnalyticsComponent } from './ApplicationComponents/payment-analytics/payment-analytics.component';
import { AlertFormComponent } from './ApplicationComponents/alert-form/alert-form.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';



const routes: Routes = [
  { path: '', component: SignupComponent,  },  // Signup page route
  { path: 'login', component: LoginComponent,  },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'profile', component: ProfileComponent,canActivate:[AuthGuard] },
  { path: 'loan-creation', component: LoanCreationComponent ,canActivate:[AuthGuard] },
  { path: 'loan-configure', component: LoanConfigureComponent ,canActivate:[AuthGuard] },
  { path: 'view-forms', component: ViewFormsComponent ,canActivate:[AuthGuard]},
  { path: 'borrower-dashboard', component: BorrowerDashboardComponent },
  { path: 'borrower-loanDetails', component: BorrowerLoanDetailsComponent },

  { path: 'loan-estimation', component: LoanEstimationComponent,},
  { path: 'borrower-application-form', component: BorrowerApplicationFormComponent},
  { path: 'payment-analytics', component: PaymentAnalyticsComponent,canActivate:[AuthGuard] },
  { path: 'alert-form', component: AlertFormComponent,canActivate:[AuthGuard] }, 
  { path: 'payment-history', component: PaymentHistoryComponent,canActivate:[AuthGuard] }, 

  { path: 'check-loan-details', component: CheckLoanDetailsComponent},
  {path: 'payment-form', component: PaymentFormComponent},

  { path: 'pay-here', component: PayHereComponent },
  { path: 'track-payment', component: TrackPaymentsComponent,canActivate:[AuthGuard] },
  { path: 'view-payments', component: ViewPaymentsComponent,canActivate:[AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' },


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{ 
  
}

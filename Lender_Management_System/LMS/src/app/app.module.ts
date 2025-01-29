import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
import { ToastrModule } from 'ngx-toastr'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './Components/signup/signup.component';
import { LoginComponent } from './Components/login/login.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DashboardComponent } from './ApplicationComponents/dashboard/dashboard.component';

import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { LoanCreationComponent } from './LoanConfiguration/loan-creation/loan-creation.component';
import { LoanConfigureComponent } from './LoanConfiguration/loan-configure/loan-configure.component';
import { BorrowerDashboardComponent } from './Borrowers/borrower-dashboard/borrower-dashboard.component';

import { BorrowerLoanDetailsComponent } from './Borrowers/borrower-loan-details/borrower-loan-details.component';

import { LoanEstimationComponent } from './Borrowers/loan-estimation/loan-estimation.component';
import { BorrowerApplicationFormComponent } from './Borrowers/borrower-application-form/borrower-application-form.component';
import { ViewFormsComponent } from './ApplicationComponents/view-forms/view-forms.component';
import { CheckLoanDetailsComponent } from './Borrowers/check-loan-details/check-loan-details.component';
import { PaymentFormComponent } from './Borrowers/payment-form/payment-form.component';

import { PayHereComponent } from './Borrowers/pay-here/pay-here.component';
import { TrackPaymentsComponent } from './ApplicationComponents/track-payments/track-payments.component';
import { ViewPaymentsComponent } from './ApplicationComponents/view-payments/view-payments.component';
import { PaymentAnalyticsComponent } from './ApplicationComponents/payment-analytics/payment-analytics.component';
import { AlertFormComponent } from './ApplicationComponents/alert-form/alert-form.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { DeleteStatusService } from './services/delete-status.service';





@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    LoanCreationComponent,
    LoanConfigureComponent,
    BorrowerDashboardComponent,
    BorrowerLoanDetailsComponent,
    
    LoanEstimationComponent,
    BorrowerApplicationFormComponent,
    ViewFormsComponent,
    CheckLoanDetailsComponent,
    PaymentFormComponent,
    PayHereComponent,
    TrackPaymentsComponent,
    ViewPaymentsComponent,
    PaymentAnalyticsComponent,
    AlertFormComponent,
    PaymentHistoryComponent,
   

   
 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,RouterLink,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,  
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', 
      timeOut: 3000, 
      progressBar: true, 
      closeButton: true, 
      preventDuplicates: true, 
      newestOnTop: true, 
    })
    
  
   
  ],
  providers: [DeleteStatusService],
  bootstrap: [AppComponent]
})
export class AppModule { }


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoanEstimationService } from 'src/app/services/loan-estimation.service';

@Component({
  selector: 'app-borrower-loan-details',
  templateUrl: './borrower-loan-details.component.html',
  styleUrls: ['./borrower-loan-details.component.css'],
})
export class BorrowerLoanDetailsComponent {
  loanDetails = {
    loanType: '',
    loanReason: '',
    loanAmount: null,
    loanTerm: null,
  };

  availableLenders: any[] = [];
  formSubmitted = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private loanEstimationService: LoanEstimationService
  ) {}

  submitLoanDetails() {
    if (
      this.loanDetails.loanType &&
      this.loanDetails.loanReason &&
      this.loanDetails.loanAmount &&
      this.loanDetails.loanTerm
    ) {
      console.log('Loan Details Submitted:', this.loanDetails);

      this.http
        .post(
          'http://localhost:8080/api/loan-configuration/available-lenders',
          this.loanDetails
        )
        .subscribe(
          (response: any) => {
            console.log('Available Lenders:', response);
            this.availableLenders = response;
            this.formSubmitted = true;
          },
          (error: any) => {
            console.error('Error fetching loan configurations', error);
            alert('Failed to fetch loan configurations.');
          }
        );
    } else {
      alert('Please fill out all required fields.');
    }
  }

  applyForLoan(lender: any) {
    console.log('Applying for loan with lender:', lender);

    
    this.loanDetails.loanTerm = lender.loanTerm;
    this.loanEstimationService.setLoanData(this.loanDetails, lender);

    
    this.router.navigate(['/loan-estimation']);
  }
}

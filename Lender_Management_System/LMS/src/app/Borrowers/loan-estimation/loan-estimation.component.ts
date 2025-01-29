import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanDataService } from 'src/app/services/loan-data.service';
import { LoanEstimationService } from 'src/app/services/loan-estimation.service';

@Component({
  selector: 'app-loan-estimation',
  templateUrl: './loan-estimation.component.html',
  styleUrls: ['./loan-estimation.component.css']
})
export class LoanEstimationComponent implements OnInit {

  loanDetails: any;
  lender: any;
  emi: number = 0;
  totalPayable: number = 0;
  interestAmount: number = 0;

  constructor(private loanEstimationservice: LoanEstimationService, private loanDataService: LoanDataService, private router: Router) {}

  ngOnInit() {
    this.loanDetails = this.loanEstimationservice.getLoanDetails();
    this.lender = this.loanEstimationservice.getLender();

    if (this.loanDetails && this.lender) {
     
      console.log('Lender Name:', this.lender.name);
    } else {
      console.error('Loan details or lender information is missing.');
    }
  }

  calculateEMI() {
    const principal = this.loanDetails.loanAmount;
    const annualRate = this.lender.interestRate; 
    const monthlyRate = annualRate / 100 / 12; 
    const loanTermInMonths = this.loanDetails.loanTerm; 

   
    const emiNumerator = principal * monthlyRate * Math.pow(1 + monthlyRate, loanTermInMonths);
    const emiDenominator = Math.pow(1 + monthlyRate, loanTermInMonths) - 1;
    this.emi = Math.round(emiNumerator / emiDenominator); 

    
    this.totalPayable = this.emi * loanTermInMonths;
    this.interestAmount = this.totalPayable - principal;
  }

  navigateToApplicationForm() {
    this.loanDataService.setLoanData(
      this.loanDetails,
      this.lender,
      this.emi,  
      this.totalPayable 
    );
    this.router.navigate(['/borrower-application-form']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoanDataService } from 'src/app/services/loan-data.service';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-borrower-application-form',
  templateUrl: './borrower-application-form.component.html',
  styleUrls: ['./borrower-application-form.component.css']
})
export class BorrowerApplicationFormComponent implements OnInit {
  loanApplication = {
    lenderId: '',
    name: '',
    loanType: '',
    loanAmount: null,
    loanTerm: null,
    borrowerName: '',
    borrowerEmail: '',
    phoneNumber: '',
    emiEstimatedPerMonth: 0,
    bankAccountNumber: null,
    bankName: '',
    bankIfscCode: '',
    interestRate: 0,
    creditScore: null,
    panCard: '',
    totalPayableAmount: 0
  };
  lenderName: string = ''; 
  lenderEmail: string = ''; 
  formSubmitted: boolean = false; 
  isLoading: boolean = false; 

  constructor(
    private loanDataService: LoanDataService,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService 
  ) {}

  ngOnInit() {
    const data = this.loanDataService.getLoanData();
    if (data.loanDetails && data.lender) {
      this.loanApplication.loanType = data.loanDetails.loanType;
      this.loanApplication.loanAmount = data.loanDetails.loanAmount;
      this.loanApplication.loanTerm = data.loanDetails.loanTerm;
      this.loanApplication.emiEstimatedPerMonth = data.emiEstimatedPerMonth;
      this.loanApplication.totalPayableAmount = data.totalPayableAmount;
      this.loanApplication.interestRate = data.lender.interestRate;
      this.loanApplication.lenderId = data.lender.lenderId;
      this.lenderName = data.lender.name;
      this.lenderEmail = data.lender.email;
    } else {
      console.error('Loan details or lender information is missing.');
    }
  }

  submitForm(): void {


    if (this.loanApplication.borrowerEmail === this.lenderEmail) {
      this.toastr.error('A lender cannot send an application to himself.'); // Show toaster message
      return; // Prevent form submission
    }

    
    this.isLoading = true; 

    const requestPayload = {
      ...this.loanApplication,
      lenderName: this.lenderName,
      lenderEmail: this.lenderEmail
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http.post('http://localhost:8080/api/loan-applications', requestPayload, { headers })
      .subscribe(
        (response: any) => {
          this.toastr.success('Loan Application Submitted Successfully.'); 
          console.log('Loan Application submitted successfully:', response);
          this.formSubmitted = true;
          this.isLoading = false; 
        },
        (error: any) => {
          console.error('Error submitting loan application:', error);
          this.toastr.error('Error submitting loan application. Please try again.'); 
          this.isLoading = false; 
        }
      );
  }
}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-check-loan-details',
  templateUrl: './check-loan-details.component.html',
  styleUrls: ['./check-loan-details.component.css']
})
export class CheckLoanDetailsComponent {
  loanId: string = '';
  loanDetails: any = null;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    console.log('Loan ID:', this.loanId);
  
    const apiUrl = 'http://localhost:8080/api/loan-details/'; 
  
    this.http.get(`${apiUrl}${this.loanId}`).subscribe(
      (response) => {
        this.loanDetails = response;
        this.errorMessage = ''; 
      },
      (error) => {
        
        if (error.status === 404) {
          this.errorMessage =  'Please check the Loan ID and try again.';
        } else {
          this.errorMessage = 'An error occurred while fetching loan details. Please try again later.';
        }
        console.error('Error fetching loan details:', error);
      }
    );
  }
  
  goBack() {
    this.loanDetails = null;  
    this.loanId = '';  
    this.errorMessage = '';  
  }
}

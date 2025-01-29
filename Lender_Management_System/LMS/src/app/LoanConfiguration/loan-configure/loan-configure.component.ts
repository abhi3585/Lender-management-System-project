import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loan-configure',
  templateUrl: './loan-configure.component.html',
  styleUrls: ['./loan-configure.component.css']
})
export class LoanConfigureComponent implements OnInit {

  loanConfig = {
    lenderId: '',
    name: '',
    email: '',
    loanType: '',
    interestRate: null,
    loanTerm: null,
    minLoanAmount: null,
    maxLoanAmount: null,
  };

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getUserDetails().then(userDetails => {
      this.loanConfig.lenderId = userDetails.lenderId || '';
      this.loanConfig.name = userDetails.name || '';
      this.loanConfig.email = userDetails.email || ''; // Automatically fill lenderId and name
      console.log('Lender ID:', this.loanConfig.lenderId);
      console.log('Username:', this.loanConfig.name);
      console.log('Email:', this.loanConfig.email);
    }).catch((error: any) => {
      console.error('Error fetching user details:', error);
    });
  }

 
  getUserDetails(): Promise<any> {
    return this.http.get<any>('http://localhost:8080/api/loan-configuration/user-details', { withCredentials: true })
      .toPromise()
      .catch(error => {
        console.error('Error fetching user details:', error);
        throw error;
      });
  }

  saveLoanConfig(): void {
    
    if (
      this.loanConfig.interestRate != null && this.loanConfig.interestRate < 0 ||
      this.loanConfig.minLoanAmount != null && this.loanConfig.minLoanAmount < 0 ||
      this.loanConfig.maxLoanAmount != null && this.loanConfig.maxLoanAmount < 0
    ) {
      alert('Please ensure that all values are non-negative.');
      return;
    }

    const backendUrl = 'http://localhost:8080/api/loan-configuration';

    
    const isValid = this.loanConfig.lenderId && this.loanConfig.loanType && this.loanConfig.interestRate != null && this.loanConfig.email;

    if (!isValid) {
      alert('Please fill in all the required fields.');
      return;
    }

    
    this.http.post(backendUrl, this.loanConfig).subscribe({
      next: (response: any) => {
        console.log('Loan configuration saved successfully:', this.loanConfig);
        this.toastr.success('Loan configuration saved successfully', 'Success');
        
        
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        console.error('Error saving loan configuration:', error);
        this.toastr.error('Error saving loan configuration. Please try again.', 'Error');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/loan-creation']);
  }
}

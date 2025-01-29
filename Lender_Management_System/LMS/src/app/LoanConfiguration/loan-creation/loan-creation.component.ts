import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loan-creation',
  templateUrl: './loan-creation.component.html',
  styleUrls: ['./loan-creation.component.css']
})
export class LoanCreationComponent implements OnInit {
  loanConfigurations: any[] = []; 
  selectedLoanConfiguration: any = null; 

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchLoanConfigurations().then(configurations => {
      this.loanConfigurations = configurations;
    }).catch(error => {
      console.error('Error fetching loan configurations:', error);
    });
  }

  fetchLoanConfigurations(): Promise<any[]> {
    const backendUrl = `http://localhost:8080/api/loan-configuration/all`;
    return fetch(backendUrl, { credentials: 'include' })
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching loan configurations:', error);
        return [];
      });
  }

  viewLoanConfiguration(config: any): void {
    console.log(config)
    this.selectedLoanConfiguration = config; 
  }

  deleteLoanConfiguration(configId: number): void {
    const backendUrl = `http://localhost:8080/api/loan-configuration/${configId}`;
    fetch(backendUrl, { method: 'DELETE', credentials: 'include' })
      .then(response => {
        if (response.ok) {
          this.toastr.success('Loan configuration deleted successfully.');
          this.loanConfigurations = this.loanConfigurations.filter(config => config.id !== configId);
          this.selectedLoanConfiguration = null; 
        } else {
          throw new Error('Failed to delete loan configuration');
        }
      })
      .catch(error => {
        console.error('Error deleting loan configuration:', error);
        alert('Error deleting loan configuration. Please try again.');
      });
  }

  createLoan(): void {
    this.router.navigate(['/loan-configure']);
  }
  goBack(): void {
    this.router.navigate(['/dashboard']); 
  }
}











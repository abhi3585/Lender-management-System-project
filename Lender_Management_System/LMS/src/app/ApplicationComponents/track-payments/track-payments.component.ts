import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { DeleteStatusService } from 'src/app/services/delete-status.service';


@Component({
  selector: 'app-track-payments',
  templateUrl: './track-payments.component.html',
  styleUrls: ['./track-payments.component.css'],

})
export class TrackPaymentsComponent implements OnInit {
  

  lenderId: string | null = '';
  loanApplications: any[] = []; // To holds the fetched loan applications
  errorMessage: string = ''; 
  showDeleteButton: boolean = false;
  loanId:string=''
  emiSchedule: any[] = [];
  allPaid:boolean[]=[]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService,
    private deleteStatusService: DeleteStatusService
  ) {
   
   
  }
  

  ngOnInit(): void {
   this.route.queryParams.subscribe((params) => {
      this.lenderId = params['lenderId']; 
      if (this.lenderId) {
        console.log('lenderId',this.lenderId)
        this.fetchApprovedLoanApplications();
      }
    });
  }

  


  fetchApprovedLoanApplications(): void {
    if (this.lenderId) {
      this.http.get<any[]>(`http://localhost:8080/api/approved-loans/${this.lenderId}`).subscribe(
        (applications) => {
          if (applications && applications.length > 0) {
            this.loanApplications = applications;
            this.allPaid = new Array(this.loanApplications.length).fill(false); // Initialize allPaid
            console.log("Approved Loan Applications:", this.loanApplications);
  
            // Fetch EMI schedules for each loan
            this.loanApplications.forEach((application, index) => {
              this.fetchEmiSchedule(application.loanId, index);
            });
            this.allPaid = new Array(this.loanApplications.length).fill(false); // Initialize allPaid

          } else {
            this.errorMessage = 'No approved loan applications found for this lender.';
            console.error(this.errorMessage);
          }
        },
        (error) => {
          this.errorMessage = 'No approved loan applications found for this lender.';
        }
      );
    }
  }
  
  fetchEmiSchedule(loanId: string, index: number): void {
    const apiUrl = `http://localhost:8080/api/emi-schedule/${loanId}`;
    this.http.get<any[]>(apiUrl).subscribe(
      (response) => {
        this.emiSchedule = response;
        console.log(`EMI Schedule for Loan ID ${loanId}:`, this.emiSchedule);
  
        // Check if all EMIs are paid for this loan
        const allPaidForLoan = this.emiSchedule.every((emi) => emi.status === 'Paid');
        this.allPaid[index] = allPaidForLoan;
  
       
  
        // Update the delete button visibility for this loan
        this.showDeleteButton = this.allPaid.every((status) => status); // Show button only if all loans are paid
        
        this.checkAllEmisPaid(index);
      },
      (error) => {
        console.error(`Error fetching EMI schedule for Loan ID ${loanId}:`, error);
        this.errorMessage = 'Unable to fetch EMI schedule. Please try again.';
      }
    );
  }
  

  checkAllEmisPaid(loanIndex: number): void {
    let paidCount = 0;
  
    // Count the number of "Paid" EMIs
    for (let i = 0; i < this.emiSchedule.length; i++) {
      if (this.emiSchedule[i].status === 'Paid') {
        paidCount++;
      }
    }
  
    // Update the allPaid array for the specific loan index
    this.allPaid[loanIndex] = paidCount === this.emiSchedule.length;
  

    console.log(`Paid Count: ${paidCount}`);
    console.log(`EMI Schedule Length: ${this.emiSchedule.length}`);
    console.log(`All EMIs Paid for Loan ${loanIndex}:`, this.allPaid[loanIndex]);
  
    
    this.showDeleteButton = this.allPaid[loanIndex]
    console.log("Global showDeleteButton  :", this.showDeleteButton);
  }
  
  
  

  viewPaymentDetails(loanId: string, loanType: string): void {
    this.router.navigate(['/view-payments'], {
      queryParams: { loanId,loanType: encodeURIComponent(loanType)  }
    });
  }

  

  deleteLoanApplication(loanId: string): void {
    if (this.showDeleteButton && confirm('Are you sure you want to delete this loan EMI?')) {
      this.http.delete(`http://localhost:8080/api/delete-approved-loans/${loanId}`).subscribe(
        (response: any) => {
          this.loanApplications = this.loanApplications.filter(application => application.loanId !== loanId);
          this.toastr.success('Loan EMI deleted successfully.', 'Success'); 
          console.log(`Loan application with ID ${loanId} deleted successfully.`);
        },
        (error) => {
          this.toastr.error('Failed to delete the loan EMI. Please try again later.', 'Error'); 
          console.error('Error deleting loan application:', error);
        }
      );
    }
  }

  
}

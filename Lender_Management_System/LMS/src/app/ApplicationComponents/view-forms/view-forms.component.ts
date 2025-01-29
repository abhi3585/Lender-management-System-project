import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-forms',
  templateUrl: './view-forms.component.html',
  styleUrls: ['./view-forms.component.css']
})
export class ViewFormsComponent implements OnInit {

  loanApplications: any[] = []; 
  selectedApplication: any = null; 
  message: string = ''; 
  showCreditScoreModal: boolean = false; 
  inputCreditScore: number | null = null; 
  creditScoreStatus: string | null = null; 
  lenderId: string | null = '';
  isProcessed: boolean = false; 
  statusMessage: string = ''; 
  statusMessageClass: string = ''; 
  isLoading: boolean = false; 

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private toastr: ToastrService 
  ) {}

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      this.lenderId = params['lenderId'];
      if (this.lenderId) {
        this.fetchLoanApplications();
      } else {
        console.error('Lender ID is missing');
      }
    });
  }

  fetchLoanApplications(): void {
    this.http.get<any[]>(`http://localhost:8080/api/loan-applications/${this.lenderId}`).subscribe(
      (applications) => {
        console.log('Loan Applications:', applications); 
        if (applications === null || applications.length === 0) {
          this.message = 'No loan applications found for this lender.';
          this.loanApplications = [];
        } else {
          this.loanApplications = applications; 
        }
      },
      (error) => {
        console.error('Error fetching loan applications:', error);
        if (error.status === 404) {
          this.message = 'No loan applications found for this lender.';
        } else {
          this.message = 'Error fetching loan applications.';
        }
      }
    );
  }

  viewApplication(application: any): void {
    this.selectedApplication = application;
    this.isProcessed = this.selectedApplication.status === 'Approved' || this.selectedApplication.status === 'Rejected'; // Check if application is already processed
  }

  backToTable(): void {
    this.selectedApplication = null;
  }

  openCreditScoreModal(): void {
    this.showCreditScoreModal = true;
  }

  closeCreditScoreModal(): void {
    this.showCreditScoreModal = false;
    this.inputCreditScore = null;
    this.creditScoreStatus = null;
  }

  checkCreditScore(): void {
    if (this.inputCreditScore !== null) {
      if (this.inputCreditScore > 900 || this.inputCreditScore < 0) {
        this.creditScoreStatus = 'Invalid Credit Score';
      } else if (this.inputCreditScore >= 750) {
        this.creditScoreStatus = 'Excellent';
      } else if (this.inputCreditScore >= 650) {
        this.creditScoreStatus = 'Good';
      } else if (this.inputCreditScore >= 550) {
        this.creditScoreStatus = 'Average';
      } else {
        this.creditScoreStatus = 'Bad';
      }
    } else {
      this.creditScoreStatus = 'Invalid Credit Score';
    }
  }
  

  approveApplication(): void {
    if (this.selectedApplication) {
      this.isLoading = true; 
      this.selectedApplication.status = 'Approved'; 
      this.updateStatusStyle('Approved'); 

      const url = 'http://localhost:8080/api/approveLenderApplication';
      this.http.post(url, this.selectedApplication, { responseType: 'text' as 'json' }).subscribe({
        next: (response) => {
          this.toastr.success('Loan application approved!');
          this.isLoading = false; 
          this.isProcessed = true; 
        },
        error: (error) => {
          console.error('Error approving application:', error);
          this.toastr.error('Failed to approve the application.');
          this.isLoading = false; 
          this.isProcessed = true; 
        },
      });
    }
  }

  rejectApplication(): void {
    if (this.selectedApplication) {
      this.isLoading = true; 
      this.selectedApplication.status = 'Rejected'; 
      this.updateStatusStyle('Rejected'); 

      const url = 'http://localhost:8080/api/rejectLenderApplication';
      this.http.post(url, this.selectedApplication, { responseType: 'text' as 'json' }).subscribe({
        next: (response) => {
          this.toastr.error('Loan application rejected.');
          this.isLoading = false; 
          this.isProcessed = true; 
        },
        error: (error) => {
          console.error('Error rejecting application:', error);
          this.toastr.error('Failed to reject the application.');
          this.isLoading = false; 
          this.isProcessed = true; 
        },
      });
    }
  }

  updateStatusStyle(status: string): void {
    const statusElement = document.getElementById('status');
    if (statusElement) {
      if (status === 'Approved') {
        statusElement.style.backgroundColor = 'green';
        statusElement.style.color = 'white';
      } else if (status === 'Rejected') {
        statusElement.style.backgroundColor = 'red';
        statusElement.style.color = 'white';
      } else {
        statusElement.style.backgroundColor = '';
        statusElement.style.color = '';
      }
    }
  }

  deleteApplication(applicationId: string): void {
    if (confirm('Are you sure you want to delete this application?')) {
      this.http.delete(`http://localhost:8080/api/loan-applications/${applicationId}`, { responseType: 'text' }).subscribe({
        next: (response) => {
          this.toastr.success('Application deleted successfully.');
          this.loanApplications = this.loanApplications.filter(app => app.applicationId !== applicationId);
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error deleting application:', error);
          this.toastr.error('Failed to delete the application.');
        },
      });
    }
  }
}

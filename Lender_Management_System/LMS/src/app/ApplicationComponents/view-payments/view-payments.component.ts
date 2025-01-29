import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteStatusService } from 'src/app/services/delete-status.service';

@Component({
  selector: 'app-view-payments',
  templateUrl: './view-payments.component.html',
  styleUrls: ['./view-payments.component.css']
})
export class ViewPaymentsComponent {

  loanId: string = '';
  loanType:string='';
  emiSchedule: any[] = [];
  errorMessage: string = '';
  


  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient,    private deleteStatusService: DeleteStatusService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.loanId = params['loanId'];
      this.loanType = decodeURIComponent(params['loanType']);
      console.log(this.loanId);
      console.log(this.loanType);
      this.fetchEmiSchedule();
    });
   
      
  }
  fetchEmiSchedule() {
    const apiUrl = `http://localhost:8080/api/emi-schedule/${this.loanId}`;
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.emiSchedule = [...response];
  
        // Sort the EMIs: "Due" first, then "Paid" ordered by installmentDate
        this.emiSchedule.sort((a, b) => {
          if (a.status === 'Due' && b.status === 'Paid') {
            return -1; // "Due" comes before "Paid"
          } else if (a.status === 'Paid' && b.status === 'Due') {
            return 1; // "Paid" comes after "Due"
          } else if (a.status === 'Paid' && b.status === 'Paid') {
            // Sort "Paid" by installmentDate (ascending)
            return new Date(a.installmentDate).getTime() - new Date(b.installmentDate).getTime();
          } else {
            // Keep "Due" in their original order
            return 0;
          }
        });
  
        console.log("Sorted EMI schedule: ", this.emiSchedule);
      },
      (error: any) => {
        console.error('Error fetching EMI schedule:', error);
        this.errorMessage = 'Unable to fetch EMI schedule. Please try again.';
      }
    );
  }
  

 


  
  navigateToAlertForm(): void {
    if (this.emiSchedule.length > 0) {
      const borrowerName = this.emiSchedule[0]?.borrowerName || '';
      const borrowerEmail = this.emiSchedule[0]?.borrowerEmail || '';
  
      this.router.navigate(['/alert-form'], {
        queryParams: {
          borrowerName: encodeURIComponent(borrowerName),
          borrowerEmail: encodeURIComponent(borrowerEmail),
          loanType: encodeURIComponent(this.loanType)
        }
      });
    } else {
      console.error('No EMI schedule available to fetch borrower details.');
    }
  }
  

  trackPaymentHistory(): void {
    this.router.navigate(['/payment-history'], { queryParams: { loanId: this.loanId } });
  }
  
}

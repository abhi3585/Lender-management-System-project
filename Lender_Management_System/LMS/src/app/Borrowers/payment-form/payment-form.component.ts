import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentService } from 'src/app/services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent {
  loanId: string = '';
  emiSchedule: any[] = [];
  errorMessage: string = '';
  isSubmitted: boolean = false;  

  constructor(private router: Router, private http: HttpClient, private paymentService: PaymentService) {}

  onSubmit() {
    const apiUrl = `http://localhost:8080/api/emi-schedule/${this.loanId}`;
  
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        console.log('EMI schedule found:', response);
        this.emiSchedule = response;
  
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
  
        this.paymentService.setEmiDetails(this.emiSchedule);
        this.errorMessage = '';
        this.isSubmitted = true;
        this.updatePayNowVisibility();
      },
      (error) => {
        console.error('Error fetching EMI schedule:', error);
        this.errorMessage = 'Loan ID not found. Please check and try again.';
      }
    );
  }
  

  payEmi(amount: number, date: string, id: number, loanId: string, name: string, mail: string) {
    console.log(id);
    console.log(`Paying EMI for month: ${date}`);
  
    this.paymentService.setPaymentDetails({ amount, date, id, loanId, name, mail });
  
   
    const emiIndex = this.emiSchedule.findIndex(emi => emi.id === id);
    console.log(emiIndex)
    
    this.updatePayNowVisibility(); 
  
  
    this.router.navigate(['/pay-here']);
  }


  updatePayNowVisibility() {
    let firstUnpaidFound = false;
  
    this.emiSchedule.forEach((emi) => {
      if (emi.status === 'Due' && !firstUnpaidFound) {
        emi.showPayNow = true; // Enable "Pay Now" for the first unpaid EMI
        firstUnpaidFound = true;
      } else {
        emi.showPayNow = false; // Disable "Pay Now" for other due EMIs
      }
    });
  }
  
  
}








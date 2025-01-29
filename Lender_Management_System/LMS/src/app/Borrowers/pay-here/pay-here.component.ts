import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-pay-here',
  templateUrl: './pay-here.component.html',
  styleUrls: ['./pay-here.component.css']
})
export class PayHereComponent implements OnInit {
  loanId: string = '';
  id: number = 0;
  amount: number = 0;
  date: string = '';
  name: string = '';
  mail: string = '';

  cardDetails = {
    cardNumber: '',
    cardHolderName: '',
    cvv: '',
    expiryDate: ''
  };

  errorMessage: string = '';
  successMessages: string[] = [];
  transactionId: string = '';
  updatedBalance: number = 0;
  isSubmitting: boolean = false;
  showReceiptButton: boolean = false;
  paymentProcessed: boolean = false;  // Flag to hide the form after payment submission

  constructor(private paymentService: PaymentService, private http: HttpClient) {}

  ngOnInit(): void {
    const paymentDetails = this.paymentService.getPaymentDetails(); 
    if (paymentDetails) {
      this.loanId = paymentDetails.loanId;
      this.date = paymentDetails.date;
      this.amount = paymentDetails.amount;
      this.id = paymentDetails.id;
      this.name = paymentDetails.name;
      this.mail = paymentDetails.mail;
    }
  }

  submitPayment() {
    this.errorMessage = '';
    this.successMessages = [];
    this.isSubmitting = true;
    this.showReceiptButton = false;
  
    const paymentData = {
      cardNumber: this.cardDetails.cardNumber,
      cardHolderName: this.cardDetails.cardHolderName,
      cvv: this.cardDetails.cvv,
      expiryDate: this.cardDetails.expiryDate,
      balance: this.amount
    };
  
    this.http
      .post(`http://localhost:8080/api/pay-emi/${this.id}/${this.date}/${this.loanId}/${this.mail}`, paymentData, { withCredentials: true })
      .subscribe(
        (response: any) => {
          this.isSubmitting = false;
          this.paymentProcessed = true;
  
          if (response.status === 'success') {
            this.transactionId = response.transactionId;
  
            // Notify PaymentFormComponent about the successful payment
            this.paymentService.updateEmiStatus(this.id, 'Paid'); // Update the status of the EMI
  
            this.successMessages = [
              `Payment successful!`,
              `Transaction ID: ${this.transactionId}`,
              `Amount Debited: ₹${this.amount}`,
            ];
            this.showReceiptButton = true;
          } else {
            this.errorMessage = response.message || 'Payment failed. Please try again.';
          }
        },
        (error) => {
          this.isSubmitting = false;
          this.paymentProcessed = true;
  
          // Check if the error is due to simultaneous payments
          if (error.error?.message === 'Payment already processed by another user.') {
            this.errorMessage = 'This EMI has already been paid by another user. Please refresh the page.';
          } else {
            this.errorMessage = error.error?.message || 'An error occurred during payment. Please try again.';
          }
        }
      );
  }
  
  
  

  generateReceipt() {
    const doc = new jsPDF();
  
    
  
   
    doc.setDrawColor(0, 0, 0); 
    doc.rect(10, 10, 190, 270); 
  
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Payment Receipt', 105, 50, { align: 'center' });
  
    
    doc.setDrawColor(0, 0, 0);
    doc.line(20, 55, 190, 55);
  
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
  
    const details = [
      { label: 'Transaction ID:', value: this.transactionId },
      { label: 'Name:', value: this.name },
      { label: 'Loan ID:', value: this.loanId },
      { label: 'Date:', value: this.date },
      { label: 'Amount Paid:', value: `Rs.${this.amount}` },
    ];
  
    let yPosition = 70;
    details.forEach((detail) => {
      doc.text(`${detail.label}`, 20, yPosition);
      doc.text(`${detail.value}`, 80, yPosition);
      yPosition += 10;
    });
  
    
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.text('Thank you for your payment!', 105, yPosition + 20, { align: 'center' });
  
  
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('For any queries, contact us at support@example.com', 105, 290, { align: 'center' });
  
    
    doc.save(`Receipt_${this.transactionId}.pdf`);
  }
  

  
}

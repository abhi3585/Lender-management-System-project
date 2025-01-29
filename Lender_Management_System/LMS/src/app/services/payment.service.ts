import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
 
  private emiDetails: any = null; // Store EMI details
  private paymentDetails: any = null; // Store payment details

  constructor() {}

  // Set EMI details
  setEmiDetails(emiDetails: any) {
    this.emiDetails = emiDetails;
  }

  // Get EMI details
  getEmiDetails() {
    return this.emiDetails;
  }

  // Set Payment details
  setPaymentDetails(paymentDetails: any) {
    this.paymentDetails = paymentDetails;
  }

  // Get Payment details
  getPaymentDetails() {
    return this.paymentDetails;
  }

  updateEmiStatus(emiId: number, status: string) {
    const emiIndex = this.emiDetails.findIndex((emi: { id: number; }) => emi.id === emiId);
    if (emiIndex !== -1) {
      this.emiDetails[emiIndex].status = status;
    }
  }
}

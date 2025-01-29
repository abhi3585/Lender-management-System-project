// loan-estimation.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoanEstimationService {
  private loanDetails: any = null;
  private lender: any = null;

  setLoanData(loanDetails: any, lender: any) {
    this.loanDetails = loanDetails;
    this.lender = lender;
  }

  getLoanDetails() {
    return this.loanDetails;
  }

  getLender() {
    return this.lender;
  }

  
}

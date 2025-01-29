import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoanDataService {
  private loanDetails: any = null;
  private lender: any = null;
  private emiEstimatedPerMonth: number = 0;
  private totalPayableAmount: number = 0;


  setLoanData(loanDetails: any, lender: any, emiEstimatedPerMonth: number, totalPayableAmount: number): void {
    this.loanDetails = loanDetails;
    this.lender = lender;
    this.emiEstimatedPerMonth = emiEstimatedPerMonth;
    this.totalPayableAmount = totalPayableAmount;
  }


  getLoanData(): { loanDetails: any; lender: any; emiEstimatedPerMonth: number; totalPayableAmount: number } {
    return {
      loanDetails: this.loanDetails,
      lender: this.lender,
      emiEstimatedPerMonth: this.emiEstimatedPerMonth,
      totalPayableAmount: this.totalPayableAmount,
    };
  }
}

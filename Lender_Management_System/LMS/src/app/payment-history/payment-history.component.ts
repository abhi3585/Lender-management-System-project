import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent implements OnInit {
  loanId: string = '';
  transactions: any[] = [];
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    
    this.route.queryParams.subscribe((params) => {
      this.loanId = params['loanId'];
      if (this.loanId) {
        this.fetchTransactionHistory();
      }
    });
  }

  fetchTransactionHistory(): void {
    const apiUrl = `http://localhost:8080/api/transactions/${this.loanId}`;
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.transactions = response.transactions;
        } 
      },
      (error) => {
        console.error('Error fetching transactions:', error);
        this.errorMessage = 'No transactions found.';
      }
    );
  }
}

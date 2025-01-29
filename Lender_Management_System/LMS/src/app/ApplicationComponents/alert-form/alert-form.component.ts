import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-alert-form',
  templateUrl: './alert-form.component.html',
  styleUrls: ['./alert-form.component.css']
})
export class AlertFormComponent implements OnInit {
  borrowerName: string = '';
  borrowerEmail: string = '';
  loanType: string = '';
  date: string = '';
  formSubmitted: boolean = false;  
  isLoading: boolean = false;      

  constructor(private router: Router,private route:ActivatedRoute, private http: HttpClient) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: { [x: string]: any; }) => {
      this.borrowerName = decodeURIComponent(params['borrowerName'] || '');
      this.borrowerEmail = decodeURIComponent(params['borrowerEmail'] || '');
      this.loanType = decodeURIComponent(params['loanType'] || '');
    });
  }

  onSubmit(): void {
    const alertData = {
      borrowerName: this.borrowerName,
      borrowerEmail: this.borrowerEmail,
      date: this.date,
      loanType: this.loanType // Include loanType
    };
    

    
    this.isLoading = true;

   
    this.http.post('http://localhost:8080/api/send-alert', alertData)
      .subscribe(
        (response: any) => {
          console.log('Alert sent successfully:', response.message);
          this.formSubmitted = true;  // Set formSubmitted to true when submission is successful
          this.isLoading = false;     // Set loading state to false after the request is complete
        },
        error => {
          console.error('Error sending alert:', error);
          this.isLoading = false;     
        }
      );
  }

 
}

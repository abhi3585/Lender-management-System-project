import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  name: string | null = '';
  lenderId: string | null = '';
 

  
  
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  async getUserDetails(): Promise<void> {
    try {
      const userDetails = await this.fetchUserDetails();
      this.name = userDetails.name;
      this.lenderId = userDetails.lenderId;
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }

  fetchUserDetails(): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:8080/profile/api/user-details', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch user details');
          }
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }

  
 

  onViewFormsClick(): void {
    if (!this.lenderId) {
      console.error('Lender ID is missing');
      return;
    }
    this.router.navigate(['/view-forms'], { queryParams: { lenderId: this.lenderId } });
  }

  onTrackPaymentsClick(): void {
    if (!this.lenderId) {
      console.error('Lender ID is missing');
      return;
    }
    this.router.navigate(['/track-payment'], { queryParams: { lenderId: this.lenderId } });
  }

  onPaymentAnalyticsClick(): void {
    if (!this.lenderId) {
      console.error('Lender ID is missing');
      return;
    }
    this.router.navigate(['/payment-analytics'], { queryParams: { lenderId: this.lenderId } });
  }

  logout(): void {
    fetch('http://localhost:8080/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          this.router.navigate(['/login']);
        } else {
          console.error('Logout failed');
        }
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
  }
}

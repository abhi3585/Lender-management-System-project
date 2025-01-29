import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile = {
    fullname: '',
    email: '',
    lenderId: '',
    phonenumber: null,
    bankname: '',
    accountnumber: null,
    ifsc: ''
  };
  isFirstTimeLogin: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService 
  ) {}

  ngOnInit(): void {
    this.getUserDetails().then(userDetails => {
      this.profile.fullname = userDetails.name || '';
      this.profile.email = userDetails.email || '';
      this.profile.lenderId = userDetails.lenderId || '';
      this.checkFirstTimeLogin(userDetails.lenderId);
    }).catch((error: any) => {
      console.error('Error fetching profile data:', error);
      this.toastr.error('Failed to fetch profile data. Please try again.', 'Error');
    });
  }

  getUserDetails(): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:8080/profile/api/user-details', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  }

  checkFirstTimeLogin(lenderId: string): void {
    const backendUrl = `http://localhost:8080/profile/${lenderId}`;
    this.http.get(backendUrl).subscribe({
      next: (response: any) => {
        if (response === "First time login, please complete the profile") {
          this.isFirstTimeLogin = true;
        } else {
          this.isFirstTimeLogin = false;
          this.profile = response;
        }
      },
      error: (error: any) => {
        console.error('Error checking first-time login:', error);
        this.toastr.error('Error checking first-time login. Please try again.', 'Error');
      }
    });
  }

  saveProfile(): void {
    const backendUrl = 'http://localhost:8080/profile';

    const isUpdated = this.profile.fullname && this.profile.email && this.profile.lenderId;

    this.http.post(backendUrl, this.profile).subscribe({
      next: (response: any) => {
        if (isUpdated) {
          this.toastr.success('Profile updated successfully.', 'Success'); 
        } else {
          this.toastr.success('Profile saved successfully.', 'Success'); 
        }
        
       
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        console.error('Error saving profile:', error);
        this.toastr.error('Error saving profile. Please try again.', 'Error'); 
      }
    });
  }
}

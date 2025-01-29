import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private http: HttpClient,private router : Router){}

  ngOnInit():void{
    this.checkSession();
  }

  checkSession(): Promise<void> {
    return this.http
      .get<boolean>('http://localhost:8080/api/validate-session', { withCredentials: true })
      .toPromise()
      .then((hasSession: boolean | undefined) => {
        if (hasSession) {
          this.router.navigate(['/dashboard']);
        }
      })
      .catch((error: any) => {
        console.error('No valid session:', error);
      });
  }
}

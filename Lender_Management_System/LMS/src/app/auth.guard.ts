import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn ,Router} from '@angular/router';

export const AuthGuard: CanActivateFn = async (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);

  const AUTH_STATUS_URL = 'http://localhost:8080/api/validate-session';

  try {
    const response = await http.get<boolean>(AUTH_STATUS_URL, { withCredentials: true }).toPromise();
    if (response===true) {
      return true;
    } else {
      router.navigate(['/'])
        return false;
    }
  } catch (error) {
    console.error('Error checking authentication status:', error);
    await router.navigate(['/']);
    return false;
   }
};
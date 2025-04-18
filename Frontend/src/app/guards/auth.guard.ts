import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: any): Observable<boolean> {
    const allowedRoles = route.data['roles'] || [];
    const employeeId = this.userService.getEmployeeIdFromToken();

    if (!employeeId) {
      // If there's no token, redirect to login
      this.router.navigate(['/login']);
      return of(false);
    }

    // If there's an employee ID, check the role asynchronously
    return this.userService.getUserById(employeeId).pipe(
      map((data) => {
        const userRole = data.role;
        if (!allowedRoles.includes(userRole)) {
          // If user doesn't have the required role, redirect to the dashboard
          this.router.navigate(['/dashboard']);
          return false;
        }
        return true;
      }),
      catchError(() => {
        // If request fails, redirect to login (e.g., user doesn't exist or server failure)
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}

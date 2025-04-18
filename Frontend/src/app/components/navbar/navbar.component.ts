import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports:[CommonModule,FormsModule,RouterModule]
})
export class NavbarComponent {

   userDetails: any;  
    errorMessage: string = ''; 
  
    constructor(private userService: UserService,private router:Router) {}
  
    ngOnInit(): void {
      const employeeId = this.userService.getEmployeeIdFromToken(); 
      if (employeeId) {
        this.userService.getUserById(employeeId).subscribe({
          next: (data) => {
            this.userDetails = data; 
            console.log('User Details:', data);
          },
          error: (error) => {
            this.errorMessage = 'Error fetching user details.';
            console.error('Error:', error);
          },
        });
      } else {
        this.errorMessage = 'Employee ID not found in token.';
      }
    }
  
    logout(): void {
      localStorage.removeItem('token'); // Remove the token
      this.router.navigate(['/login'], { replaceUrl: true }); // Use replaceUrl to replace history
    }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-dashboard',
  standalone:true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports:[CommonModule,FormsModule,RouterModule,NavbarComponent]
})
export class DashboardComponent implements OnInit {
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
    localStorage.removeItem('token'); 

    this.router.navigate(['/login']);
  }
  handleBack = () => {
    // Called on back navigation
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  };

}

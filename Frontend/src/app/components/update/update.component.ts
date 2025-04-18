import { Component } from '@angular/core';
import { UserService } from '../../services/user.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-update',
  standalone: true,
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
  imports: [CommonModule,FormsModule,NavbarComponent],
})
export class UpdateComponent {
  userId: string = ''; 
  user = {
    name: '',
    dept: '',
    email: '',
    dob: '',
    role: 'EMPLOYEE',
  }; 
  updateSuccess: string = ''; 
  updateError: string = ''; 

  constructor(private userService: UserService) {} 

  onFetch(): void {
    this.userService.getUserById(+this.userId).subscribe({
      next: (response: any) => {
        this.user.name = response.name;
        this.user.dept = response.dept;
        this.user.email = response.email;
        this.user.dob = response.dob;
        this.user.role = response.role.replace('ROLE_', '');
        this.updateError = '';
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
        this.updateError = `Failed to fetch user with ID ${this.userId}.`;
      },
    });
  }

  onUpdate(): void {
    this.userService.updateUser(+this.userId, { ...this.user, id: +this.userId }).subscribe({
      next: () => {
        this.updateSuccess = `User with ID ${this.userId} updated successfully.`;
        this.updateError = '';
        this.user = {
          name: '',
          dept: '',
          email: '',
          dob: '',
          role: 'EMPLOYEE',
        };
        this.userId = ''; 
        
      },
      error: (error: any) => {
        console.error('Error updating user:', error);
        this.updateError = `Failed to update user with ID ${this.userId}.`;
        this.updateSuccess = '';
      },
    });
  
  }
  
}

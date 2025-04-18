import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-add',
  imports:[CommonModule,FormsModule,NavbarComponent],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  user = {
    name: '',
    dept: '',
    email: '',
    dob: '',
    password: '',
    role: 'EMPLOYEE',
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private userService: UserService) {}

  onSubmit(): void {
    this.userService.addUser(this.user).subscribe({
      next: (response: any) => {
        console.log('User added successfully:', response);
        this.successMessage = 'User added successfully!';
        this.errorMessage = null;
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Reload the page after 2 seconds
      },
      error: (error: any) => {
        console.error('Error adding user:', error);
        this.errorMessage = 'Failed to add user. Please try again.';
        this.successMessage = null;
      },
    });
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
interface AuthResponse {
  token: string;
}

@Component({
  selector: 'login',
  standalone:true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports:[CommonModule,FormsModule],
})

export class LoginComponent {
  email = ''; 
  password = ''; 
  errorMessage = '';

  constructor(private authService: AuthService) {}
  ngOnInit():void{

    localStorage.removeItem('token');
  }

  onSubmit(): void {
  console.log('Login form submitted'); 

  this.authService.authenticate(this.email, this.password).subscribe({
    next: (response: { jwt: string; error: any }) => {
      console.log('Full Response:', response); 
      const jwtToken = response.jwt; 
      

      if (jwtToken) {
        localStorage.setItem('token', jwtToken);
console.log("Local Storage: ",localStorage.getItem('token'));
        window.location.href = '/dashboard';
      } else {
        console.warn('JWT token is missing in the response!');
      }
    },
    error: (error: any) => {
      this.errorMessage = 'Invalid credentials. Please try again.';
      console.error('Authentication Error:', error);
    },
  });
}

  
  
  
}

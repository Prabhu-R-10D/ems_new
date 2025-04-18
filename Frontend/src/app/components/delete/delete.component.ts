import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [CommonModule, FormsModule,NavbarComponent],
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  deleteSuccess: string = '';
  deleteError: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    // Reusing the same method as ListComponent
    this.userService.getSortedEmployees('id', 'asc').subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Error fetching users:', err)
    });
  }

  selectUser(user: any): void {
    this.selectedUser = user;
    this.deleteSuccess = '';
    this.deleteError = '';
  }

  onDelete(): void {
    if (!this.selectedUser) return;

    const confirmDelete = confirm(`Are you sure you want to delete ${this.selectedUser.name}?`);
    if (!confirmDelete) return;

    this.userService.deleteUser(this.selectedUser.id).subscribe({
      next: () => {
        this.deleteSuccess = `User ${this.selectedUser.name} deleted successfully.`;
        this.users = this.users.filter(u => u.id !== this.selectedUser.id);
        this.selectedUser = null;
      },
      error: (error) => {
        this.deleteError = `Failed to delete user.`;
        console.error('Error deleting user:', error);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-pagination',
  imports: [FormsModule, CommonModule,NavbarComponent],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit {
  employees: any[] = [];  
  totalItems: number = 0;  
  currentPage: number = 0; 
  pageSize: number = 5; 

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadEmployees(this.currentPage, this.pageSize);
  }

  loadEmployees(page: number, size: number): void {
    this.userService.getPaginatedEmployees(page, size).subscribe(response => {
      this.employees = response.content; 
      this.totalItems = response.totalElements; 
    });
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadEmployees(this.currentPage, this.pageSize); 
    }
  }

  onPageSizeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement) {
      this.pageSize = parseInt(selectElement.value, 10);  
      this.currentPage = 0;
      this.loadEmployees(this.currentPage, this.pageSize); 
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize); 
  }

  getPages(): number[] {
    return new Array(this.totalPages).fill(0).map((x, i) => i);  
  }
}

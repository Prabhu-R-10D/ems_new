import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-list',
  standalone:true,
  imports:[CommonModule,FormsModule,NavbarComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  employees: any[] = [];
  sortOrder: string = 'asc';
  sortField: string = 'id'; 

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList(): void {
    this.userService.getSortedEmployees(this.sortField, this.sortOrder).subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching sorted employee data:', error);
      }
    );
  }

  changeSortOrder(order: string): void {
    this.sortOrder = order;
    this.getEmployeeList();
  }

  changeSortField(field: string): void {
    this.sortField = field;
    this.getEmployeeList();
  }
}

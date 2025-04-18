import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-search',
  standalone:true,
  imports:[FormsModule,CommonModule,NavbarComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})


export class SearchComponent {
  searchType: string = 'ID'; 
  searchTerm: string = '';
  searchResults: any[] = [];
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  search(): void {
    if (this.searchTerm.trim() === '') {
      this.errorMessage = 'Please enter a value to search';
      return;
    }

    switch (this.searchType) {
      case 'ID':
        this.searchById();
        break;
      case 'Name':
        this.searchByName();
        break;
      case 'Department':
        this.searchByDept();
        break;
      default:
        this.errorMessage = 'Please select a valid search type';
    }
  }

  searchByName(): void {
    this.userService.searchByName(this.searchTerm).subscribe(
      (data) => {
        this.searchResults = data;
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Error occurred while searching by name.';
        console.error(error);
      }
    );
  }

  searchByDept(): void {
    this.userService.searchByDept(this.searchTerm).subscribe(
      (data) => {
        this.searchResults = data;
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Error occurred while searching by department.';
        console.error(error);
      }
    );
  }

  searchById(): void {
    const id = Number(this.searchTerm);
    if (isNaN(id) || id <= 0) {
      this.errorMessage = 'Please enter a valid ID';
      return;
    }

    this.userService.getUserById(id).subscribe(
      (data) => {
        this.searchResults = [data]; 
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Error occurred while searching by ID.';
        console.error(error);
      }
    );
  }

  clearSearch(): void {
    this.searchType = 'id';
    this.searchTerm = '';
    this.searchResults = [];
    this.errorMessage = '';
  }
}
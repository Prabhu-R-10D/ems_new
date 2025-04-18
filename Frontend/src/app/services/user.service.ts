import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';

import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

interface UserDetails {
  id: number;
  name: string;
  email: string;
  role: string;
  dob: string; 
  dept: string; 
}

interface AddUserRequest {
  name: string;
  dept: string;
  email: string;
  dob: string;
  password: string;
  role: string;
}

interface UpdateUserRequest {
  name: string;
  dept: string;
  email: string;
  dob: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8000/users';

  constructor(private http: HttpClient) {}

  getEmployeeIdFromToken(): number | null {
    const token = localStorage.getItem('token'); 
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.employeeId || null; 
    }
    return null;
  }

  getUserById(id: number): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.baseUrl}/${id}`);
  }
  
  addUser(userData: AddUserRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, userData);
  }

  updateUser(id: number, updatedUser: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, updatedUser); 
  }
  
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
  
  

  getSortedEmployees(sortBy: string, order: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/sort?sortBy=${sortBy}&order=${order}`);
  }

  getPaginatedEmployees(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.baseUrl}/page`, { params });
  }

  searchByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/searchByName/${name}`);
  }

  searchByDept(dept: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/searchByDept/${dept}`);
  }


}

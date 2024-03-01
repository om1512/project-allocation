import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  constructor(private http: HttpClient) {}

  getUsers(email: string): Observable<any> {
    const url = 'http://localhost:8080/api/users/email/' + email;
    return this.http.get<any>(url);
  }

  url = 'http://localhost:8080';

  generateToken(credentials: any) {
    return this.http.post(`${this.url}/auth/login`, credentials);
  }

  login(token: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token == undefined || token === '' || token == null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    return true;
  }
}

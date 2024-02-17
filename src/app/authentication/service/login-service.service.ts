import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  getUsers(email: string): Observable<any> {
    const url = 'http://localhost:8080/api/users/email/' + email;
    return this.http.get<any>(url);
  }
}

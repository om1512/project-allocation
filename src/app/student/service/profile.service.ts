import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(uid: string): Observable<any> {
    const url = 'http://localhost:8080/api/student/userId/' + uid;
    return this.http.get<any>(url);
  }

  getAll(): Observable<any> {
    const url = 'http://localhost:8080/api/student';
    return this.http.get<any>(url);
  }
}

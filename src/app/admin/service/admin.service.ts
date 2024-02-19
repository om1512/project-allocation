import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private dashboard = new BehaviorSubject<boolean>(true);
  private addStudents = new BehaviorSubject<boolean>(false);
  _dashboard = this.dashboard.asObservable();
  _addStudents = this.addStudents.asObservable();

  updateState(dashboard: boolean, addStudents: boolean) {
    this.addStudents.next(addStudents);
    this.dashboard.next(dashboard);
  }

  private apiUrl = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAllStudents(): Observable<any> {
    const url = this.apiUrl + '/api/student';
    return this.httpClient.get<any>(url);
  }

  getAllFaculties(): Observable<any> {
    const url = this.apiUrl + '/api/faculty';
    return this.httpClient.get<any>(url);
  }
}

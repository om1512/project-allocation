import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  throwError,
} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from '../interface/student';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private dashboard = new BehaviorSubject<boolean>(true);
  private addStudents = new BehaviorSubject<boolean>(false);
  private addFaculties = new BehaviorSubject<boolean>(false);

  _dashboard = this.dashboard.asObservable();
  _addStudents = this.addStudents.asObservable();
  _addFaculties = this.addFaculties.asObservable();

  updateState(dashboard: boolean, addStudents: boolean, addFaculties: boolean) {
    this.addStudents.next(addStudents);
    this.dashboard.next(dashboard);
    this.addFaculties.next(addFaculties);
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

  saveStudent(student: Student): Observable<boolean> {
    const url = this.apiUrl + '/api/student';
    return this.httpClient.post(url, student).pipe(
      map((response: any) => {
        console.log('POST request successful', response);
        return true;
      }),
      catchError((error) => {
        console.error('Error in POST request', error);
        return of(false);
      })
    );
  }
}

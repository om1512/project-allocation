import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupServiceService {

  constructor(private http: HttpClient) { }

  createGroup(data: any): Observable<any> {
    console.log(data);
    const url = 'http://localhost:8080/api/group/createGroup/' + data.student.id;
    return this.http.post(url, data).pipe(
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

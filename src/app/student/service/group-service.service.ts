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
    return this.http.post(url, {
      groupName: data.groupName,
      year: data.year
    });
  }

  getGroup(gid: string): Observable<any> {
    const url = 'http://localhost:8080/api/group/' + gid;
    return this.http.get<any>(url);
  }

  leaveGroup(data: any): Observable<any> {
    const url = 'http://localhost:8080/api/group/leaveGroup/' + data.student_id + '/' + data.group_id;
    return this.http.post<any>(url, {});
  }
}

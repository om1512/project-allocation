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

  sendRequest(data: any): Observable<any> {
    const url = 'http://localhost:8080/api/request/' + data.student.id + '/' + data.sender.group.id;
    return this.http.post<any>(url, {});
  }

  getStudentRequest(student_id: string): Observable<any> {
    const url = 'http://localhost:8080/api/request/student/' + student_id;
    return this.http.get<any>(url);
  }

  getGroupRequest(group_id: string): Observable<any> {
    const url = 'http://localhost:8080/api/request/group/' + group_id;
    return this.http.get<any>(url);
  }

  approveRequest(data: any): Observable<any> {
    const url = 'http://localhost:8080/api/request/' + data.group.student.id + '/' + data.requestId + '/approve/' + data.group.id + '/' + data.student.id;
    return this.http.post<any>(url, {});
  }

  rejectRequest(data: any): Observable<any> {
    const url = 'http://localhost:8080/api/request/' + data.group.student.id + '/' + data.requestId + '/reject/' + data.group.id + '/' + data.student.id;
    return this.http.post<any>(url, {});
  }
}

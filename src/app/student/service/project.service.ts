import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    const url = 'http://localhost:8080/api/project';
    return this.http.get<any>(url);
  }

  customProject(data: any): Observable<any> {
    console.log(data);

    const url = 'http://localhost:8080/api/project/custom/' + data.id;
    return this.http.post<any>(url, {
      name: data.name,
      description: data.desc
    });
  }
}

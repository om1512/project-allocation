import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FacultyService {
  constructor(private http: HttpClient) {}
  url: string = 'http://localhost:8080';

  getData(email: string) {
    return this.http.get<any>(`${this.url}/api/faculty/email/${email}`);
  }

  saveFaculty(
    faculty: any
  ): Observable<{ success: boolean; data?: any; error?: any }> {
    const url = `${this.url}/api/faculty`;
    return this.http
      .post(url, faculty, { observe: 'response', responseType: 'text' })
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            console.log('POST request successful', response);
            return { success: true, data: response.body };
          } else {
            console.error('Error in POST request', response);
            return { success: false, error: response.body };
          }
        }),
        catchError((error) => {
          console.error('Error in POST request', error);
          return of({ success: false, error });
        })
      );
  }

  addDomain(
    domain: string
  ): Observable<{ success: boolean; data?: any; error?: any }> {
    const url = `${this.url}/api/domain`;
    return this.http
      .post(url, domain, { observe: 'response', responseType: 'text' })
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            console.log('POST request successful', response);
            return { success: true, data: response.body };
          } else {
            console.error('Error in POST request', response);
            return { success: false, error: response.body };
          }
        }),
        catchError((error) => {
          console.error('Error in POST request', error);
          return of({ success: false, error });
        })
      );
  }

  mapDomainWithFaculty(facId: number, domainId: number) {
    const url = `${this.url}/api/domain/map/${facId}/${domainId}`;
    return this.http
      .post(url, {}, { observe: 'response', responseType: 'text' })
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            console.log('Mapped Successful', response);
            return { success: true, data: response.body };
          } else {
            console.error('Error in POST request', response);
            return { success: false, error: response.body };
          }
        }),
        catchError((error) => {
          console.error('Error in POST request', error);
          return of({ success: false, error });
        })
      );
  }

  getAllDomains() {
    return this.http.get<any>(`${this.url}/api/domain`);
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private acceptRequestSubject = new Subject<any>();

  constructor() { }

  getAcceptRequestObservable() {
    return this.acceptRequestSubject.asObservable();
  }

  acceptRequest(requestData: any) {
    this.acceptRequestSubject.next(requestData);
  }
}

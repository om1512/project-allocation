import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private addStudents = new BehaviorSubject<boolean>(true);
  _addStudents = this.addStudents.asObservable();

  updateState(addStudents: boolean) {
    this.addStudents.next(addStudents);
  }

  constructor() {}
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private homeActive = new BehaviorSubject<boolean>(true);
  _homeActive = this.homeActive.asObservable();

  private groupActive = new BehaviorSubject<boolean>(false);
  _groupActive = this.groupActive.asObservable();

  private projectActive = new BehaviorSubject<boolean>(false);
  _projectActive = this.projectActive.asObservable();

  updateState(homeActive: boolean, groupActive: boolean, projectActive: boolean) {
    this.homeActive.next(homeActive);
    this.groupActive.next(groupActive);
    this.projectActive.next(projectActive);
  }

  constructor() { }
}

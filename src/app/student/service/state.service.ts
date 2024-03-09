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

  private groupsActive = new BehaviorSubject<boolean>(false);
  _groupsActive = this.groupsActive.asObservable();

  updateState(homeActive: boolean, groupActive: boolean, projectActive: boolean, groupsActive: boolean) {
    this.homeActive.next(homeActive);
    this.groupActive.next(groupActive);
    this.projectActive.next(projectActive);
    this.groupsActive.next(groupsActive);
  }

  constructor() { }
}

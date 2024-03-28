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

  private sendRequestActive = new BehaviorSubject<boolean>(false);
  _sendRequestActive = this.sendRequestActive.asObservable();

  private projectChoiceActive = new BehaviorSubject<boolean>(false);
  _projectChoiceActive = this.projectChoiceActive.asObservable();

  private removeMemberActive = new BehaviorSubject<boolean>(false);
  _removeMemberActive = this.removeMemberActive.asObservable();

  updateState(
    homeActive: boolean,
    groupActive: boolean,
    projectActive: boolean,
    groupsActive: boolean,
    sendRequestActive: boolean,
    projectChoiceActive: boolean,
    removeMemberActive: boolean) {
    this.homeActive.next(homeActive);
    this.groupActive.next(groupActive);
    this.projectActive.next(projectActive);
    this.groupsActive.next(groupsActive);
    this.sendRequestActive.next(sendRequestActive);
    this.projectChoiceActive.next(projectChoiceActive);
    this.removeMemberActive.next(removeMemberActive);
  }

  constructor() { }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {
  private _isSidebarCollapsed = new BehaviorSubject<boolean>(false);
  isSidebarCollapsed$ = this._isSidebarCollapsed.asObservable();

  constructor() { }

  toggleSidebar() {
    this._isSidebarCollapsed.next(!this._isSidebarCollapsed.value);
  }
}

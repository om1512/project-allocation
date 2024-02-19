import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNavHeaderComponent } from './admin-nav-header.component';

describe('AdminNavHeaderComponent', () => {
  let component: AdminNavHeaderComponent;
  let fixture: ComponentFixture<AdminNavHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminNavHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminNavHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

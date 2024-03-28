import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRequestsCardComponent } from './group-requests-card.component';

describe('GroupRequestsCardComponent', () => {
  let component: GroupRequestsCardComponent;
  let fixture: ComponentFixture<GroupRequestsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupRequestsCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupRequestsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

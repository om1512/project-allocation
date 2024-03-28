import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectChoiceComponent } from './project-choice.component';

describe('ProjectChoiceComponent', () => {
  let component: ProjectChoiceComponent;
  let fixture: ComponentFixture<ProjectChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectChoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

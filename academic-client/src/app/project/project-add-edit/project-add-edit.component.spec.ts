import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAddEditComponent } from './project-add-edit.component';

describe('ProjectAddEditComponent', () => {
  let component: ProjectAddEditComponent;
  let fixture: ComponentFixture<ProjectAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

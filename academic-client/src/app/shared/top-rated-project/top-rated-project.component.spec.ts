import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedProject } from './top-rated-project.component';

describe('TopRatedProject', () => {
  let component: TopRatedProject;
  let fixture: ComponentFixture<TopRatedProject>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopRatedProject ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRatedProject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinePostsComponent } from './timeline-posts.component';

describe('TimelinePostsComponent', () => {
  let component: TimelinePostsComponent;
  let fixture: ComponentFixture<TimelinePostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelinePostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

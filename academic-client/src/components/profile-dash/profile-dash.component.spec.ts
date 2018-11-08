import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDashComponent } from './profile-dash.component';

describe('ProfileDashComponent', () => {
  let component: ProfileDashComponent;
  let fixture: ComponentFixture<ProfileDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

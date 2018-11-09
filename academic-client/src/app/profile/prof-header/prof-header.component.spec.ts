import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfHeaderComponent } from './prof-header.component';

describe('ProfHeaderComponent', () => {
  let component: ProfHeaderComponent;
  let fixture: ComponentFixture<ProfHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

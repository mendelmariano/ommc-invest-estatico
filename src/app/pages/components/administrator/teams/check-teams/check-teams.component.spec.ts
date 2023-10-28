import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckTeamsComponent } from './check-teams.component';

describe('CheckTeamsComponent', () => {
  let component: CheckTeamsComponent;
  let fixture: ComponentFixture<CheckTeamsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckTeamsComponent]
    });
    fixture = TestBed.createComponent(CheckTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

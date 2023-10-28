import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckTeamChampionshipComponent } from './check-team-championship.component';

describe('CheckTeamChampionshipComponent', () => {
  let component: CheckTeamChampionshipComponent;
  let fixture: ComponentFixture<CheckTeamChampionshipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckTeamChampionshipComponent]
    });
    fixture = TestBed.createComponent(CheckTeamChampionshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

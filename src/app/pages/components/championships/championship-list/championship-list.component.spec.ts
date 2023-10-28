import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionshipListComponent } from './championship-list.component';

describe('ChampionshipListComponent', () => {
  let component: ChampionshipListComponent;
  let fixture: ComponentFixture<ChampionshipListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChampionshipListComponent]
    });
    fixture = TestBed.createComponent(ChampionshipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

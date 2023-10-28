import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionshipCrudComponent } from './championship-crud.component';

describe('ChampionshipCrudComponent', () => {
  let component: ChampionshipCrudComponent;
  let fixture: ComponentFixture<ChampionshipCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChampionshipCrudComponent]
    });
    fixture = TestBed.createComponent(ChampionshipCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentsCrudComponent } from './investments-crud.component';

describe('InvestmentsCrudComponent', () => {
  let component: InvestmentsCrudComponent;
  let fixture: ComponentFixture<InvestmentsCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentsCrudComponent]
    });
    fixture = TestBed.createComponent(InvestmentsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

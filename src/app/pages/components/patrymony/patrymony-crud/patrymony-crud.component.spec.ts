import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrymonyCrudComponent } from './patrymony-crud.component';

describe('PatrymonyCrudComponent', () => {
  let component: PatrymonyCrudComponent;
  let fixture: ComponentFixture<PatrymonyCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatrymonyCrudComponent]
    });
    fixture = TestBed.createComponent(PatrymonyCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutsCrudComponent } from './outs-crud.component';

describe('OutsCrudComponent', () => {
  let component: OutsCrudComponent;
  let fixture: ComponentFixture<OutsCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutsCrudComponent]
    });
    fixture = TestBed.createComponent(OutsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationTableComponent } from './classification-table.component';

describe('ClassificationTableComponent', () => {
  let component: ClassificationTableComponent;
  let fixture: ComponentFixture<ClassificationTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassificationTableComponent]
    });
    fixture = TestBed.createComponent(ClassificationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

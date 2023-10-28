import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeCrudComponent } from './mode-crud.component';

describe('ModeCrudComponent', () => {
  let component: ModeCrudComponent;
  let fixture: ComponentFixture<ModeCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeCrudComponent]
    });
    fixture = TestBed.createComponent(ModeCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

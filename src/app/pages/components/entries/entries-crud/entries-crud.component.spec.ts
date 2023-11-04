import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntriesCrudComponent } from './entries-crud.component';

describe('EntriesCrudComponent', () => {
  let component: EntriesCrudComponent;
  let fixture: ComponentFixture<EntriesCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntriesCrudComponent]
    });
    fixture = TestBed.createComponent(EntriesCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSettingsFormComponent } from './users-settings-form.component';

describe('UsersSettingsFormComponent', () => {
  let component: UsersSettingsFormComponent;
  let fixture: ComponentFixture<UsersSettingsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersSettingsFormComponent]
    });
    fixture = TestBed.createComponent(UsersSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

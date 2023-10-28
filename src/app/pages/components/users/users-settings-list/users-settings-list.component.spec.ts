import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSettingsListComponent } from './users-settings-list.component';

describe('UsersSettingsListComponent', () => {
  let component: UsersSettingsListComponent;
  let fixture: ComponentFixture<UsersSettingsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersSettingsListComponent]
    });
    fixture = TestBed.createComponent(UsersSettingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

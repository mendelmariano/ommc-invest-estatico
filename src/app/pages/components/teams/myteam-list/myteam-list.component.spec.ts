import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyteamListComponent } from './myteam-list.component';

describe('MyteamListComponent', () => {
  let component: MyteamListComponent;
  let fixture: ComponentFixture<MyteamListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyteamListComponent]
    });
    fixture = TestBed.createComponent(MyteamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChampionshipsComponent } from './my-championships.component';

describe('MyChampionshipsComponent', () => {
  let component: MyChampionshipsComponent;
  let fixture: ComponentFixture<MyChampionshipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyChampionshipsComponent]
    });
    fixture = TestBed.createComponent(MyChampionshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadsprintsComponent } from './loadsprints.component';

describe('LoadsprintsComponent', () => {
  let component: LoadsprintsComponent;
  let fixture: ComponentFixture<LoadsprintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadsprintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadsprintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

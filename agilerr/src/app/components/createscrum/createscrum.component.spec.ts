import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatescrumComponent } from './createscrum.component';

describe('CreatescrumComponent', () => {
  let component: CreatescrumComponent;
  let fixture: ComponentFixture<CreatescrumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatescrumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatescrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

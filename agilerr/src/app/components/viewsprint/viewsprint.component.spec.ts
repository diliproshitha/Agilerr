import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsprintComponent } from './viewsprint.component';

describe('ViewsprintComponent', () => {
  let component: ViewsprintComponent;
  let fixture: ComponentFixture<ViewsprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

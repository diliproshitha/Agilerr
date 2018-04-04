import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbacklogComponent } from './viewbacklog.component';

describe('ViewbacklogComponent', () => {
  let component: ViewbacklogComponent;
  let fixture: ComponentFixture<ViewbacklogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewbacklogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewbacklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

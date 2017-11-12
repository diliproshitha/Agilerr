import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitissueComponent } from './submitissue.component';

describe('SubmitissueComponent', () => {
  let component: SubmitissueComponent;
  let fixture: ComponentFixture<SubmitissueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitissueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitissueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

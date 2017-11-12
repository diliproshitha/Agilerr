import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsprintComponent } from './editsprint.component';

describe('EditsprintComponent', () => {
  let component: EditsprintComponent;
  let fixture: ComponentFixture<EditsprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

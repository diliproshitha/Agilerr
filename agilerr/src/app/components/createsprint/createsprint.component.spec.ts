import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesprintComponent } from './createsprint.component';

describe('CreatesprintComponent', () => {
  let component: CreatesprintComponent;
  let fixture: ComponentFixture<CreatesprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatesprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatesprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

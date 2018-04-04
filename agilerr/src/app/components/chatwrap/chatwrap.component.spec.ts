import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatwrapComponent } from './chatwrap.component';

describe('ChatwrapComponent', () => {
  let component: ChatwrapComponent;
  let fixture: ComponentFixture<ChatwrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatwrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatwrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

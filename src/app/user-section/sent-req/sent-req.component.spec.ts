import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentReqComponent } from './sent-req.component';

describe('SentReqComponent', () => {
  let component: SentReqComponent;
  let fixture: ComponentFixture<SentReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

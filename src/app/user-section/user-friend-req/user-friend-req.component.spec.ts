import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFriendReqComponent } from './user-friend-req.component';

describe('UserFriendReqComponent', () => {
  let component: UserFriendReqComponent;
  let fixture: ComponentFixture<UserFriendReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFriendReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFriendReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

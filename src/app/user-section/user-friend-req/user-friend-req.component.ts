import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-friend-req',
  templateUrl: './user-friend-req.component.html',
  styleUrls: ['./user-friend-req.component.css']
})
export class UserFriendReqComponent implements OnInit {
  public userDetails: any;
  public editSwitch: boolean;
  showSucessMessage: boolean;
  serverErrorMessages: any;
  public allUsersData: any;
  public requestSentSuccess: any;
  public friendReqs: any;
  public friendList: any;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

    this.getFriendListDetail() 

  }


getFriendListDetail(){
  this.userService.getFriendListDetails().subscribe(
    res => {

      // this.requestSentSuccess = res['filterResult'][0]['requestSent'];
      this.friendReqs = res['filterResult'][0]['friendRequest'];
      // this.friendList = res['filterResult'][0]['friendList'];
      return res
    },
    err => {}
  )
  }
  
  acceptFriendReq(userId, fullName){
    const json = {}
    json['id'] = userId
    json['fullName'] = fullName
    this.userService.acceptFriendReq(json).subscribe(
    res => {
      this.getFriendListDetail()
    },
    err => {}
)
  }
  rejectFriendReq(userId, fullName){
    const json = {}
    json['id'] = userId
    json['fullName'] = fullName
    this.userService.rejectFriendReq(json).subscribe(
    res => {
      this.getFriendListDetail()
    },
    err => {}
)
  }
}

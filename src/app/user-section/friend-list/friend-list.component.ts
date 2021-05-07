import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
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
        // this.friendReqs = res['filterResult'][0]['friendRequest'];
        this.friendList = res['filterResult'][0]['friendList'];
        return res
      },
      err => {}
    )
    }
}

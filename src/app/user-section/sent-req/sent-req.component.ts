import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sent-req',
  templateUrl: './sent-req.component.html',
  styleUrls: ['./sent-req.component.css']
})
export class SentReqComponent implements OnInit {
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
    this.getAllUserDetails()
  }
  getAllUserDetails(){
      this.userService.getAllUserData().subscribe(
        res =>{
        // let toFilterOut = [ ...this.requestSentSuccess, ...this.friendReqs, ...this.friendList]
        // let filteredOut = new Set(toFilterOut.map(({ id }) => id));
        // let selectedRows= res['filterResult'].filter(({ _id }) => !filteredOut.has(_id));
        this.allUsersData = res['filterResult']
        return res
        },
        err =>{
    
        }
      )
      }
  getFriendListDetail(){
    this.userService.getFriendListDetails().subscribe(
      res => {
        this.requestSentSuccess = res['filterResult'][0]['requestSent'];
        this.friendReqs = res['filterResult'][0]['friendRequest'];
        this.friendList = res['filterResult'][0]['friendList'];
        return res
      },
      err => {}
    )
    }
    
}

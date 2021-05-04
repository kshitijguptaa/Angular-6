import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails;
  public editSwitch: boolean;
  showSucessMessage: boolean;
  serverErrorMessages: any;
  allUsersData: any;
  requestSentSuccess: any;
  public friendReqs
  public friendList
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.editSwitch = false;
        this.userDetails = res['user'];
      },
      err => { 
        console.log(err);
        
      }
    );
    this.userService.getAllUserData().subscribe(
      res =>{
      this.allUsersData = res
      },
      err =>{

      }
    )
    this.userService.getFriendListDetails().subscribe(
      res => {
        this.requestSentSuccess = res['filterResult'][0]['requestSent'];
        this.friendReqs = res['filterResult'][0]['friendRequest'];
        this.friendList = res['filterResult'][0]['friendList'];
      },
      err => {}
    )
  }
  enableEdit(){
    this.editSwitch = true;
  }
  onSubmit(form: NgForm) {
    this.userService.updateUserProfile(form.value).subscribe(
      res => {
        this.editSwitch = false;
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
  }

  sendFriendReq(userId, fullName){
    console.log(fullName)
    const json = {}
    json['id'] = userId
    json['fullName'] = fullName
    this.userService.sendFriendRequest(json).subscribe(
    res => {this.requestSentSuccess = res['filterResult'][0]['requestSent']},
    err => {}
)
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}

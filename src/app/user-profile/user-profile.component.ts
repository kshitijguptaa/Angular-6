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
    this.getUserProfileDetails()  
    this.getFriendListDetail() 
    this.getAllUserDetails()
  }
getUserProfileDetails(){
  this.userService.getUserProfile().subscribe(
    res => {
      this.editSwitch = false;
      this.userDetails = res['user'];
    },
    err => { 
      console.log(err);
      
    }
  );
  }
getAllUserDetails(){
  this.userService.getAllUserData().subscribe(
    res =>{
    let toFilterOut = [ ...this.requestSentSuccess, ...this.friendReqs, ...this.friendList]
    let filteredOut = new Set(toFilterOut.map(({ id }) => id));
    let selectedRows= res['filterResult'].filter(({ _id }) => !filteredOut.has(_id));
    this.allUsersData = selectedRows
    return res
    },
    err =>{

    }
  )
  }
getFriendListDetail(){
  this.userService.getFriendListDetails().subscribe(
    res => {
      this.getAllUserDetails()
      this.requestSentSuccess = res['filterResult'][0]['requestSent'];
      this.friendReqs = res['filterResult'][0]['friendRequest'];
      this.friendList = res['filterResult'][0]['friendList'];
      return res
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
    const json = {}
    json['id'] = userId
    json['fullName'] = fullName
    this.userService.sendFriendRequest(json).subscribe(
    res => {
      this.getFriendListDetail()
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
  unfriend(userId, fullName){
    const json = {}
    json['id'] = userId
    json['fullName'] = fullName
    this.userService.unfriend(json).subscribe(
    res => {
      this.getFriendListDetail()
    },
    err => {}
)
  }
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}

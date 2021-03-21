import { Component, OnInit,ViewChild,ElementRef,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.css']
})
export class ChatPanelComponent implements OnInit {

  @ViewChild('target') myElement: ElementRef;

  username;
  messageText:String;
  messageArray = [];
  users = [];
  selectedUser;
  selectedUserId;
  constructor(private _chatService: ChatService, private router: Router) { 
    this.username = this._chatService.username;
    this._chatService.getRoomUsers().subscribe(
      data =>{
        this.users = data.users.filter(item => item.username != this.username).map(item => item);
      }
    )  

    this._chatService.newMessageReceived().subscribe(
      data => {
        this.messageArray.push(data);
      });
  }

  ngOnInit() {
  }

  leave(){
    this._chatService.leaveRoom();
    this.router.navigate([''])
  }

  sendMessage()
  {
    this._chatService.sendMessage({user:this.username,targetId:this.selectedUserId,targetName:this.selectedUser,message:this.messageText});
    this.messageText = '';
    setTimeout(() => {
      this.scrollToElement();
    },200)
  }

  clickOnUser(user){
    this.messageArray = [];
    this.selectedUser = user.username;
    this.selectedUserId = user.id
  }

  scrollToElement(){
    let element = document.getElementById('target');
    element.scrollIntoView({block: 'end'});
  }

  // @HostListener('window:beforeunload', ['$event'])
  // beforeUnloadHander(event) {
  //     debugger
  //     console.log(event)    
  // }

}

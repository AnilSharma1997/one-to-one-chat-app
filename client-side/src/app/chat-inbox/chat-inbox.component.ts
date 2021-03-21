import { Component, OnInit } from '@angular/core';
import { ChatService } from './service/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.css']
})
export class ChatInboxComponent implements OnInit {

  public user:String;
  constructor(private _chatService:ChatService, private route: Router) { 
  }

  ngOnInit() {
  }

  joinChat(){
    if(!this.user){
      return
    }
    this._chatService.setDetails(this.user);
    this._chatService.joinRoom({user:this.user});
    this.route.navigate(['/chat-panel']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/shared/message';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  className: string = localStorage.getItem('class');

  chat: Observable<Message[]>;
  message: Message = new Message();
  email: any = localStorage.getItem('email');

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chat = this.chatService.getAllByClass(this.className).valueChanges();
  }

  send() {
    this.message.from = this.email;
    this.message.class = this.className;

    if (this.chatService.checkMessage(this.message)) {
      if (this.chatService.createOne(this.message, 'chat-' + this.className)) {
        this.clear();
      }
    }
  }

  clear() {
    this.message.message = '';
  }
}
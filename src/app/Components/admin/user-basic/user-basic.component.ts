import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserInfo } from 'src/app/models/user-info';

@Component({
  selector: 'app-user-basic',
  templateUrl: './user-basic.component.html',
  styleUrls: ['./user-basic.component.scss']
})
export class UserBasicComponent implements OnInit {

  constructor() { }

  @Input()
  User?:UserInfo

  @Output() deleteEmitter: EventEmitter<number> = new EventEmitter();
   

  ngOnInit(): void {
  
  
  }

  deleteMe(){
    if (!this.User) return;
    this.deleteEmitter.emit(this.User.userId);
  }

}

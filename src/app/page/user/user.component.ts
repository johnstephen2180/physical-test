import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../account.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private isLogin: Boolean = false;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.isLogin = this.accountService.isLoggedIn();
  }

}

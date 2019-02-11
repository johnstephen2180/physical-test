import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../../account.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: any;
  page: number;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.accountService.getAllUser(0, (data) => {
      this.userList = data;
    });
  }

  pageChanged(event: any): void {
    this.page = event.page;
    this.accountService.getAllUser(this.page - 1, (data) => {
      this.userList = data;
    });
  }

}

import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../account.service';
import {AuthService, SocialUser} from 'angularx-social-login';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../_services/authentication.service';
import {User} from '../../_models/user';

//https://bootsnipp.com/snippets/featured/responsive-navigation-menu
//https://www.youtube.com/watch?v=YTt4jtiD_M4 tham khao pages
@Component({
  selector: 'app-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.css']
})
export class MenuLeftComponent implements OnInit {
  public currentUser: User;
  pages = [];
  menu = [];

  constructor(private auth: AuthenticationService) {
  }

  ngOnInit() {
    this.pages = [
      {title: 'Danh sách đề', path: '/user/exam-list', roles: ['ROLE_ADMIN', 'ROLE_USER'], icon: 'fa-file-text'},
      {title: 'Soạn đề', path: '/user/exam-create', roles: ['ROLE_ADMIN'], icon: 'fa-edit'},
      {title: 'Lịch sử làm bài', path: '/user/history-test', roles: ['ROLE_ADMIN', 'ROLE_USER'], icon: 'fa-calendar-o'},
      {title: 'Danh sách học sinh', path: '/user/list', roles: ['ROLE_ADMIN'], icon: 'fa-users'},
      {title: 'Chấm bài', path: '/user/history-test-all', roles: ['ROLE_ADMIN'], icon: 'fa-bug'}

    ];

    this.currentUser = this.auth.currentUserValue;
    console.log(this.currentUser);
    const roles = this.currentUser.roles;
    this.pages.forEach(page => {
      for (const role of roles) {
        if (page.roles.indexOf(role.role) > -1) {
          this.menu.push(page);
          break;
        }
      }
    });

  }

}

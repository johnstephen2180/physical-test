import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../account.service';
import {AuthService, SocialUser} from 'angularx-social-login';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../_services/authentication.service';
import {User} from '../../_models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: User;

  constructor(private accountService: AccountService, private authService: AuthService, private router: Router,
              private auth: AuthenticationService) {

  }

  ngOnInit() {
    this.auth.currentUser.subscribe(data => {
      console.log('lay data');
      this.currentUser = data;
    });
  }

  signOut(): void {
    this.auth.signOut();
  }

}

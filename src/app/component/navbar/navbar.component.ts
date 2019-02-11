import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../account.service';
import {AuthService, SocialUser} from 'angularx-social-login';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private isLogin: Boolean = false;
  private user: SocialUser;
  private loggedIn: Boolean = false;

  constructor(private accountService: AccountService, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.accountService.getUserLoginEmitter()
      .subscribe(item => this.isLogin = item);

    this.authService.authState.subscribe((user) => {
      if (!user) {
        this.router.navigate(['/home']);
        console.log('LOGGED OUT!!');
        this.loggedIn = false;
        this.user = null;
        return;
      }
      this.user = user;
      console.log(this.user);
      this.loggedIn = (user != null);
    });
  }

  signOut(): void {
    this.authService.signOut();
  }

}

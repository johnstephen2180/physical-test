import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../account.service';
import {AuthService, SocialUser} from 'angularx-social-login';
import {Router} from '@angular/router';

//https://bootsnipp.com/snippets/featured/responsive-navigation-menu
@Component({
  selector: 'app-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.css']
})
export class MenuLeftComponent implements OnInit {
  private user: SocialUser;
  private loggedIn: Boolean = false;

  constructor(private accountService: AccountService, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      if (!user) {
        console.log('LOGGED OUT!!');
        this.loggedIn = false;
        this.user = null;
        this.router.navigate(['/home']);
        return;
      }
      this.user = user;
      console.log(this.user);
      this.loggedIn = (user != null);
    });
  }

}

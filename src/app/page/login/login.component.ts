import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../account.service';
import {Router} from '@angular/router';
import {AuthService} from 'angularx-social-login';
import {SocialUser} from 'angularx-social-login';
import {FacebookLoginProvider} from 'angularx-social-login';
import {HttpClient} from '@angular/common/http';
import {User} from '../../_models/user';
import {AuthenticationService} from '../../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: SocialUser;
  private loggedIn: boolean;
  private currentUser: User;
  private settingUrl = 'http://localhost:9490/';
  credentials = {username: '', password: ''};

  constructor(private httpClient: HttpClient, private accountService: AccountService, private router: Router,
              private authService: AuthService, private auth: AuthenticationService) {
  }

  ngOnInit() {
    // this.authService.authState.subscribe((user) => {
    //   if (!user) {
    //     console.log('LOGGED OUT!!');
    //     this.loggedIn = false;
    //     this.user = null;
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('user');
    //
    //     this.router.navigate(['/login']);
    //     return;
    //   }
    //
    //   console.log('thuc hien dng nhap');
    //   const fbToken = user.authToken;
    //   const formData: FormData = new FormData();
    //   formData.append('fbToken', fbToken);
    //
    //   this.httpClient.post(this.settingUrl + 'token/get', formData).subscribe(data => {
    //       localStorage.setItem('token', data['token']);
    //       localStorage.setItem('user', JSON.stringify(data));
    //
    //       this.user = user;
    //       this.loggedIn = (user != null);
    //       this.router.navigate(['/user']);
    //       this.auth.login();
    //     },
    //     error => {
    //       console.log(error);
    //     });
    //
    //
    // });
  }

  public loginFb() {
    this.auth.login();
    // this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    // this.router.navigate(['/user']);
  }

  public login() {
    console.log(this.credentials);
    this.accountService.authenticate(this.credentials, () => {
      this.router.navigateByUrl('/');
    });

    return false;
  }

}

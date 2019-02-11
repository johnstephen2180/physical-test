import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../account.service';
import {Router} from '@angular/router';
import {AuthService} from 'angularx-social-login';
import {SocialUser} from 'angularx-social-login';
import {FacebookLoginProvider} from 'angularx-social-login';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: SocialUser;
  private loggedIn: boolean;
  private settingUrl = 'http://localhost:9490/';
  credentials = {username: '', password: ''};

  constructor(private httpClient: HttpClient, private accountService: AccountService, private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      if (!user) {
        console.log('LOGGED OUT!!');
        this.loggedIn = false;
        this.user = null;
        this.router.navigate(['/login']);
        return;
      }

      console.log('thuc hien dng nhap');
      const fbToken = user.authToken;
      const formData: FormData = new FormData();
      formData.append('fbToken', fbToken);

      this.httpClient.post(this.settingUrl + 'token/get', formData).subscribe(data => {
          console.log(data);
          localStorage.setItem('token', data['token']);
          this.user = user;
          this.loggedIn = (user != null);
          this.router.navigate(['/user']);
        },
        error => {
          console.log(error);
        });


    });
  }

  public loginFb() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
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

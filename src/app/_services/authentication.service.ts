import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

import {User} from '../_models/user';
import {AuthService, FacebookLoginProvider} from 'angularx-social-login';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private apiUrl = 'http://localhost:9490';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    this.authService.authState.subscribe((user) => {
      if (!user) {
        console.log('Logout');
        return;
      }

      console.log('thuc hien dng nhap in auth');
      const fbToken = user.authToken;
      const formData: FormData = new FormData();
      formData.append('fbToken', fbToken);

      this.http.post(this.apiUrl + '/token/get', formData).subscribe(data => {
          console.log('thuc hien dng nhap in auth  12');
          const currentUser = new User();
          currentUser.fullName = data['fullName'];
          currentUser.avatar = data['avatar'];
          currentUser.token = data['token'];
          currentUser.roles = data['roles'];
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          this.currentUserSubject.next(currentUser);
          this.router.navigate(['/user']);

        },
        error => {
          console.log(error);
        });

    });
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


  signOut(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
    this.authService.signOut();
    // this._testAuth();
  }


  login() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);

    // if (this.currentUserValue != null) {
    //   return;
    // }
    //
    // return this.http.post<any>(this.apiUrl + '/users/authenticate', {username, password})
    //   .pipe(map(user => {
    //     // login successful if there's a jwt token in the response
    //     if (user && user.token) {
    //       // store user details and jwt token in local storage to keep user logged in between page refreshes
    //       localStorage.setItem('currentUser', JSON.stringify(user));
    //       this.currentUserSubject.next(user);
    //     }
    //
    //     return user;
    //   }));
  }

}

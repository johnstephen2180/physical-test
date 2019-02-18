import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './_services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = 'http://localhost:9490';
  authenticated = false;
  public isLogin: Boolean = false;
  userLoginEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient, private auth: AuthenticationService) {
  }

  authenticate(credentials, callback) {

    const headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.http.get(this.apiUrl + '/api/user', {headers: headers}).subscribe(response => {
      if (response['name']) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
      return callback && callback();
    });

  }

  _getHttpHeader() {
    return {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      })
    };
  }

  public getAllUser(page: number, callback) {
    const formData: FormData = new FormData();
    formData.append('page', '' + page);
    // https://github.com/angular/angular/issues/19535
    // https://github.com/angular/angular/issues/13241
    this.http.post(this.apiUrl + '/user/all', formData, this._getHttpHeader()
    ).subscribe(data => {
        console.log(data);
        return callback && callback(data);
      },
      error => {
        console.log(error);
      });
  }


  public emitUserLogin(isLoggedIn: boolean): void {
    this.userLoginEvent.emit(isLoggedIn);
  }

  public isLoggedIn(): Boolean {
    return this.isLogin;
  }

  public logout() {
    this.isLogin = false;
  }

  public login() {
    this.isLogin = true;
    this.emitUserLogin(true);
  }


}

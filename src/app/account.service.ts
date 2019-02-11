import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = 'http://localhost:9490';
  authenticated = false;
  public isLogin: Boolean = false;
  userLoginEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient) {
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

  public getAllUser(page: number, callback) {
    const formData: FormData = new FormData();
    formData.append('token', localStorage.getItem('token'));
    formData.append('page', '' + page);
    // https://github.com/angular/angular/issues/19535
    // https://github.com/angular/angular/issues/13241
    this.http.post(this.apiUrl + '/user/all', formData
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

  public getUserLoginEmitter(): EventEmitter<boolean> {
    return this.userLoginEvent;
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

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExaminationService {
  private apiUrl = 'http://localhost:9490';

  constructor(private httpClient: HttpClient) {
  }

  public getHistoryByUser(page: number, callback) {
    const formData: FormData = new FormData();
    formData.append('token', localStorage.getItem('token'));
    formData.append('page', '' + 0);
    // https://github.com/angular/angular/issues/19535
    // https://github.com/angular/angular/issues/13241
    this.httpClient.post(this.apiUrl + '/exam/history', formData
    ).subscribe(data => {
        return callback && callback(data);
      },
      error => {
        console.log(error);
      });
  }

  public getHistoryByAdmin(page: number, callback) {
    const formData: FormData = new FormData();
    formData.append('token', localStorage.getItem('token'));
    formData.append('page', '' + 0);
    // https://github.com/angular/angular/issues/19535
    // https://github.com/angular/angular/issues/13241
    this.httpClient.post(this.apiUrl + '/exam/history/all', formData
    ).subscribe(data => {
      console.log(data);
        return callback && callback(data);
      },
      error => {
        console.log(error);
      });
  }

  public getAllExamination(page: number, callback) {
    const formData: FormData = new FormData();
    formData.append('token', localStorage.getItem('token'));
    formData.append('page', '' + page);
    // https://github.com/angular/angular/issues/19535
    // https://github.com/angular/angular/issues/13241
    this.httpClient.post(this.apiUrl + '/exam/all', formData
    ).subscribe(data => {
      console.log(data);
        return callback && callback(data);
      },
      error => {
        console.log(error);
      });
  }


}

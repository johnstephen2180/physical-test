import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AccountService} from '../../../account.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  private apiUrl = 'http://localhost:9490';
  private isLogin: Boolean = false;
  activeSlideIndex = 0;
  showIndicator = false;
  noPause: true;
  myInterval: 0;
  examination = null;
  questionNo = 0;
  started = false;
  doAtQuestion = 1;
  countdownAtSuggest = 1;
  countdownAnswer = false;
  showInMinutesArray = [1, 1, 5, 7, 10];
  suggestTimer = new Date(2000, 1, 1, 1, 10, 0);

  constructor(private accountService: AccountService, private route: ActivatedRoute, private httpClient: HttpClient) {
    this.suggestTimer = new Date(2000, 1, 1, 1, 0, 30);
    this._timerTick();
  }


  ngOnInit() {
    this.isLogin = this.accountService.isLoggedIn();
    const examId = this.route.snapshot.paramMap.get('id');

    const formData: FormData = new FormData();
    formData.append('token', localStorage.getItem('token'));
    formData.append('id', examId);

    this.httpClient.post(this.apiUrl + '/exam/get', formData).subscribe(data => {
        this.examination = data;
        this.questionNo = this.examination['questionList'].length;
      },
      error => {
        console.log(error);
      });
  }

  private _trackExam(examId, questionOrder, suggestOrder) {
    const formData: FormData = new FormData();
    formData.append('token', localStorage.getItem('token'));
    formData.append('examId', examId);
    formData.append('questionOrder', questionOrder);
    formData.append('suggestOrder', suggestOrder);
    console.log(this.examination);

    this.httpClient.post(this.apiUrl + '/exam/track', formData).subscribe(data => {

      },
      error => {
        console.log(error);
      });
    return;
  }


  private _timerTick() {
    this.suggestTimer.setSeconds(this.suggestTimer.getSeconds(), -1);
    /*Dem xong thoi gian doc de*/
    if (!this.started && this.suggestTimer.getMinutes() === 0 && this.suggestTimer.getSeconds() === 0) {
      this._updateTimer();
      this.started = true;
      setTimeout(() => this._timerTick(), 1000);
      return;
    }

    if (this.started) {
      if (this.suggestTimer.getMinutes() === 0 && this.suggestTimer.getSeconds() === 0) {
         this._trackExam(this.examination['id'], this.doAtQuestion, this.countdownAtSuggest);
        /*Dem xong phan xem dap an, chuyen sang cau khac*/
        if (this.countdownAnswer) {
          this.doAtQuestion += 1;
          this.countdownAtSuggest = 1;
          this.countdownAnswer = false;

          this._updateTimer();
          setTimeout(() => this._timerTick(), 1000);
          return;
        }

        /*Dem xong chuyen sang goi y khac*/
        this.countdownAtSuggest += 1;
        const currentQuestion = this.examination['questionList'][this.doAtQuestion - 1];
        if (currentQuestion['suggestList'].length < this.countdownAtSuggest) {
          /* Dem het goi y thi sang ket qua*/
          this.suggestTimer = new Date(2000, 1, 1, 1, 0, 35);
          this.countdownAnswer = true;
        } else {
          this._updateTimer();
        }
      }
    }


    setTimeout(() => this._timerTick(), 1000);
  }

  private _updateTimer() {
    this.suggestTimer = new Date(2000, 1, 1, 1, this.showInMinutesArray[this.countdownAtSuggest - 1], 0);
  }

  viewAnswer(order: number) {
    if (this.doAtQuestion < this.questionNo) {
      this.doAtQuestion += 1;
      this.countdownAtSuggest = 1;
      this._updateTimer();
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {ExaminationService} from '../examination.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-history-test-all',
  templateUrl: './history-test-all.component.html',
  styleUrls: ['./history-test-all.component.css']
})
export class HistoryTestAllComponent implements OnInit {
  examList: any;
  page: number;

  constructor(private examinationService: ExaminationService, private router: Router) {
  }

  ngOnInit() {
    this._getHistoryTestList(0);
  }

  private _getHistoryTestList(page) {
    this.examinationService.getHistoryByAdmin(page, (data) => {
      this.examList = data;
      const historyList = this.examList.content;
      historyList.forEach((lesson) => {
        const questionNo = lesson['examination'].questionNo;
        const questionsTrack = lesson['questions'];
        lesson['finishNo'] = questionsTrack.length + '/' + questionNo;
        let countAnswerRight = 0;
        historyList.forEach((question) => {
          if (question.finish) {
            countAnswerRight++;
          }
        });
        lesson['answerRightNo'] = countAnswerRight + '/' + questionNo;

      });
    });
  }

  pageChanged(event: any): void {
    this.page = event.page;
    this._getHistoryTestList(this.page - 1);
  }

}

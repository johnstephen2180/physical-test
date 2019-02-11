import {Component, OnInit} from '@angular/core';
import {ExaminationService} from '../examination.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-history-test',
  templateUrl: './history-test.component.html',
  styleUrls: ['./history-test.component.css']
})
export class HistoryTestComponent implements OnInit {
  examList: any;

  constructor(private examinationService: ExaminationService, private router: Router) {
  }

  ngOnInit() {
    this.examinationService.getHistoryByUser(0, (data) => {
      this.examList = data;
      console.log(this.examList);
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

}

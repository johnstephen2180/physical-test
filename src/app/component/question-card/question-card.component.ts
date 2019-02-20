import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ExaminationService} from '../../page/user/examination.service';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.css']
})
export class QuestionCardComponent implements OnInit {
  @Input() started;
  @Input() question;
  @Input() doAtQuestion;
  @Input() suggestTimer;
  @Input() countdownAtSuggest;
  @Input() countdownAnswer;
  @Output() submitAnswerEmitter = new EventEmitter();
  @Output() viewAnswerEmitter = new EventEmitter();
  @ViewChild('btn-suggest') btnSuggest: ElementRef;
  showInMinutesArray: any;
  isDisabled: Boolean = true;
  apiUrl = 'https://112.78.15.55:4201';

  constructor(private examService: ExaminationService) {
  }

  ngOnInit() {
    this.showInMinutesArray = this.examService.getSuggestCountdownMinutes();
  }


  viewAnswer() {
    this.viewAnswerEmitter.emit(this.question.order);
  }

  submitResult(value: number) {
    this.examService.checkResult(this.question.id, value, isRight => {
      this.submitAnswerEmitter.emit(isRight);
    });
  }
}

import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

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
  showInMinutesArray = [1, 2, 5, 7, 10];
  isDisabled: Boolean = true;

  constructor() {
  }

  ngOnInit() {
  }


  viewAnswer() {
    console.log(this.question);
    this.viewAnswerEmitter.emit(this.question.order);
  }

  submitAnser(value: number) {

  }
}

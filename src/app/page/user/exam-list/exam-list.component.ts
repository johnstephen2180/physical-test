import {Component, OnInit} from '@angular/core';
import {ExaminationService} from '../examination.service';
import {BsModalService} from 'ngx-bootstrap';
import {Router} from '@angular/router';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {
  examList: any;
  page: number;

  constructor(private examinationService: ExaminationService, private router: Router) {
  }

  ngOnInit() {
    this.examinationService.getAllExamination(0, (data) => {
      this.examList = data;
    });
  }

  doExam(id: any) {
    this.router.navigate(['/user/exam/test/' + id]);
  }

  pageChanged(event: any): void {
    this.page = event.page;
    console.log(this.page);
    this.examinationService.getAllExamination(this.page - 1, (data) => {
      this.examList = data;
    });
  }
}

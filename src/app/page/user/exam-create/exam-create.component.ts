import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-exam-create',
  templateUrl: './exam-create.component.html',
  styleUrls: ['./exam-create.component.css']
})
export class ExamCreateComponent implements OnInit {
  private questionFile: File = null;
  private suggestFile: File = null;
  private resultFile: File = null;
  private questionFileName = 'Chọn file đề';
  private suggestFileName = 'Chọn file gợi ý';
  private resultFileName = 'Chọn file kết quả';
  private isValidatedTitle = false;
  private modalRef: BsModalRef;
  private isCommitProcessing = true;
  private questionNo = 0;
  private suggestNo = 0;
  private examination = null;
  @ViewChild('template') content: any;


  private settingUrl = 'http://localhost:9490/admin';
  private isValidated = false;


  constructor(private httpClient: HttpClient, private modalService: BsModalService, private router: Router) {
  }

  ngOnInit() {
  }

  createExam(title) {
    const headers = new HttpHeaders().set('authorization', 'abc');

    const formData: FormData = new FormData();
    formData.append('token', localStorage.getItem('token'));
    formData.append('questionFile', this.questionFile);
    formData.append('suggestFile', this.suggestFile);
    formData.append('resultFile', this.resultFile);
    formData.append('title', title);
    // https://github.com/angular/angular/issues/19535
    // https://github.com/angular/angular/issues/13241
    this.httpClient.post(this.settingUrl + '/create/exam', formData
    ).subscribe(data => {
        console.log(data);
        this.isValidated = data['id'] != null;
        const questionList = data['questionList'];
        this.questionNo = questionList.length;
        this.suggestNo = 0;
        for (let i = 0; i < this.questionNo; i++) {
          this.suggestNo += questionList[i]['suggestList'].length;
        }
      },
      error => {
        console.log(error);
      });

  }

  handleQuestionFileInput(files: FileList) {
    this.questionFile = files.item(0);
    this.questionFileName = this.questionFile.name;
  }

  handleSuggestFileInput(files: FileList) {
    this.suggestFile = files.item(0);
    this.suggestFileName = this.suggestFile.name;
  }

  handleResultFileInput(files: FileList) {
    this.resultFile = files.item(0);
    this.resultFileName = this.resultFile.name;
  }


  handleInputExamTitle(title) {
    if (title) {
      this.isValidatedTitle = true;
    }
  }

  commitExam() {
    this.modalRef = this.modalService.show(this.content);
    const formData: FormData = new FormData();
    formData.append('token', localStorage.getItem('token'));
    this.httpClient.post(this.settingUrl + '/commit/exam', formData).subscribe(data => {
        this.isCommitProcessing = false;
        console.log(data);
        this.examination = data;
      },
      error => {
        console.log(error);
      });
  }

  doExam() {
    this.modalRef.hide();
    this.router.navigate(['/user/exam/test/' + this.examination['id']]);
  }
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {MenuLeftComponent} from '../../component/menu-left/menu-left.component';
import {TestComponent} from './test/test.component';
import {QuestionCardComponent} from '../../component/question-card/question-card.component';
import {ProfileComponent} from './profile/profile.component';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {ExamListComponent} from './exam-list/exam-list.component';
import {HistoryTestComponent} from './history-test/history-test.component';
import {ExamCreateComponent} from './exam-create/exam-create.component';
import { HistoryTestAllComponent } from './history-test-all/history-test-all.component';
import {PaginationModule} from 'ngx-bootstrap';
import { UserListComponent } from './user-list/user-list.component';
//ng add ngx-bootstrap  --component carousel, https://valor-software.com/ngx-bootstrap/#/carousel
//ng add ngx-bootstrap  --component modals
//https://angular.io/guide/lazy-loading-ngmodules
//ng add ngx-bootstrap  --component collapse
//npm install --save angularx-social-login

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    CarouselModule.forRoot(),
    PaginationModule.forRoot()
  ],
  declarations: [
    UserComponent,
    MenuLeftComponent,
    TestComponent,
    QuestionCardComponent,
    ProfileComponent,
    ExamListComponent,
    HistoryTestComponent,
    ExamCreateComponent,
    HistoryTestAllComponent,
    UserListComponent]
})
export class UserModule {
}

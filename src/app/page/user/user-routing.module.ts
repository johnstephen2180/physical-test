import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './user.component';
import {TestComponent} from './test/test.component';
import {ProfileComponent} from './profile/profile.component';
import {ExamListComponent} from './exam-list/exam-list.component';
import {HistoryTestComponent} from './history-test/history-test.component';
import {ExamCreateComponent} from './exam-create/exam-create.component';
import {HistoryTestAllComponent} from './history-test-all/history-test-all.component';
import {UserListComponent} from './user-list/user-list.component';
//https://www.technouz.com/4644/angular-5-app-structure-multiple-modules/
const routes: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      {path: '', component: ExamCreateComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'exam-list', component: ExamListComponent},
      {path: 'history-test', component: HistoryTestComponent},
      {path: 'history-test-all', component: HistoryTestAllComponent},
      {path: 'exam-create', component: ExamCreateComponent},
      {path: 'list', component: UserListComponent},
      {path: 'exam/test/:id', component: TestComponent},
    ]
  }]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}

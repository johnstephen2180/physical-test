import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppComponent} from './app.component';
import {NavbarComponent} from './component/navbar/navbar.component';
import {HomeComponent} from './page/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './page/login/login.component';
import {LessonCardComponent} from './component/lesson-card/lesson-card.component';
import {BotbarComponent} from './component/botbar/botbar.component';
import {AccountService} from './account.service';
import {ModalModule} from 'ngx-bootstrap/modal';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {SocialLoginModule, AuthServiceConfig} from 'angularx-social-login';
import {FacebookLoginProvider} from 'angularx-social-login';
import {FormsModule} from '@angular/forms';
import {ExaminationService} from './page/user/examination.service';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import {AuthenticationService} from './_services/authentication.service';
//huong dan ve role http://jasonwatmore.com/post/2018/11/22/angular-7-role-based-authorization-tutorial-with-example
const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('1909241749203352')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    LessonCardComponent,
    BotbarComponent
  ],
  imports: [
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    FormsModule
  ],
  providers: [AccountService, ExaminationService, AuthenticationService, {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }, {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})

export class AppModule {
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';

import { ValidateService} from './services/validate.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthService } from './services/auth.service';
import {HttpModule} from '@angular/http';
import { AuthGuard } from './guards/auth.guard';
import { FooterComponent } from './components/footer/footer.component';
import { CreatescrumComponent } from './components/createscrum/createscrum.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import {DashService} from './services/dash.service';
import { CreatesprintComponent } from './components/createsprint/createsprint.component';
import { LoadsprintsComponent } from './components/loadsprints/loadsprints.component';
import { ViewsprintComponent } from './components/viewsprint/viewsprint.component';
import { ChatComponent } from './components/chat/chat.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: 'createProject',
        component: CreateProjectComponent,
        outlet: 'sub'
      },
      {
        path: 'viewSprint',
        component: ViewsprintComponent
      }
    ]
  },
  {
    path: 'createSprint',
    canActivate: [AuthGuard],
    component: CreatesprintComponent
  },
  {
    path: 'createProject',
    canActivate: [AuthGuard],
    component: CreateProjectComponent
  },
  {
    path: 'viewSprint',
    canActivate: [AuthGuard],
    component: ViewsprintComponent
  },
  {
    path: 'chat',
    canActivate: [AuthGuard],
    component: ChatComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    DashboardComponent,
    FooterComponent,
    CreatescrumComponent,
    CreateProjectComponent,
    CreatesprintComponent,
    LoadsprintsComponent,
    ViewsprintComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    FlashMessagesModule,
    HttpModule
  ],
  providers: [ValidateService, AuthService, AuthGuard, DashService],
  bootstrap: [AppComponent]
})
export class AppModule { }

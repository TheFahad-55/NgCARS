import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { IntroComponent } from './intro/intro.component';
import { FooterComponent } from './footer/footer.component';
import { PricePredictorComponent } from './price-predictor/price-predictor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { SpinnerComponent } from './spinner/spinner.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AdminComponent } from './admin/admin.component';
import { SidenavComponent } from './admin/sidenav/sidenav.component';
import { WelcomeComponent } from './admin/welcome/welcome.component';
import { UsersComponent } from './admin/users/users.component';
import { ReviewsComponent } from './admin/reviews/reviews.component';
import { LogoutComponent } from './logout/logout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TokenInterceptorService } from './interceptor/token-interceptor.service';



const routes:Routes=[
  {
  path: '',component:IntroComponent
},
{
  path: 'price-predictor',component: PricePredictorComponent
},
{path:'login',component:LoginComponent},
{path:'logout',component:LogoutComponent},
{path:'signup',component:SignupComponent},
{path:'reviews',component:ReviewsComponent},
{path:'forgot-password',component:ForgotPasswordComponent},
{path:'reset-password/:token',component:ResetPasswordComponent},
{path:'admin',component:AdminComponent,children:[
  {path:'home',component:WelcomeComponent},
  {path:'users',component:UsersComponent},
  {path:'reviews',component:ReviewsComponent}
]},
{path:"**",component:NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IntroComponent,
    FooterComponent,
    PricePredictorComponent,
    SpinnerComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AdminComponent,
    SidenavComponent,
    WelcomeComponent,
    UsersComponent,
    ReviewsComponent,
    LogoutComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatCheckboxModule,
    FormsModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi: true

    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

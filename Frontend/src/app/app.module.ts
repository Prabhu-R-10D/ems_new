import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';


import { HttpInterceptor } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddComponent } from './components/add/add.component';
import { UpdateComponent } from './components/update/update.component';
import { DeleteComponent } from './components/delete/delete.component';
import { ListComponent } from './components/list/list.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SearchComponent } from './components/search/search.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,

    LoginComponent, 
    DashboardComponent,
    AddComponent,
    UpdateComponent,
    DeleteComponent,
    ListComponent,
    PaginationComponent,
    SearchComponent,
    NavbarComponent,
    


  ],
  providers: [ 
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }

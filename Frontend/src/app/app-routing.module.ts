import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddComponent } from './components/add/add.component';
import { UpdateComponent } from './components/update/update.component';
import { DeleteComponent } from './components/delete/delete.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ListComponent } from './components/list/list.component';
import { SearchComponent } from './components/search/search.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
      

      {path:'login',component:LoginComponent},
      {path:"dashboard",component:DashboardComponent,canActivate:[AuthGuard],data:{roles:['ROLE_ADMIN','ROLE_EMPLOYEE']}},
      {path:"add",component:AddComponent,canActivate: [AuthGuard],data:{roles:['ROLE_ADMIN']}},
      {path:"update",component:UpdateComponent,canActivate: [AuthGuard],data:{roles:['ROLE_ADMIN']}},
      {path:"delete",component:DeleteComponent,canActivate: [AuthGuard],data:{roles:['ROLE_ADMIN']}},
      {path:"pagination",component:PaginationComponent,canActivate:[AuthGuard],data:{roles:['ROLE_ADMIN','ROLE_EMPLOYEE']}},
      {path:"list",component:ListComponent,canActivate:[AuthGuard],data:{roles:['ROLE_ADMIN','ROLE_EMPLOYEE']}},
      {path:"search",component:SearchComponent,canActivate:[AuthGuard],data:{roles:['ROLE_ADMIN','ROLE_EMPLOYEE']}},



      { path: '', redirectTo: '/login', pathMatch: 'full' }, 
      { path: '**', redirectTo: '/login' }


    ];
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  WebComponentWrapper, WebComponentWrapperOptions
} from '@angular-architects/module-federation-tools';
import { MainComponent } from './main/main.component';
import { SuperAdminAuthGuard } from './service/super-admin-auth.guard';
import { CompanyGuard } from './service/company.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path:'', redirectTo:'login' , pathMatch:'full'},
  {
      path: 'login',
      component: LoginPageComponent,
      data: {title: "Admin Login"},
  },
    {
    path: 'home',
    component:MainComponent,
    canActivate: [CompanyGuard],
    children: [  {
      path: 'tenant',
      loadChildren: () =>
        loadRemoteModule({
          type: 'module',
          remoteEntry: 'http://localhost:4201/remoteEntry.js',
          exposedModule: './tenant-management'
        })
          .then((m: any) => m.AppModule),
          canActivate: [SuperAdminAuthGuard],
    },
    {
      path: 'company',
      component: WebComponentWrapper,
      data: {
        type: 'script',
        remoteEntry: 'http://localhost:4204/remoteEntry.js',
        remoteName: 'react',
        exposedModule: './web-components',
        elementName: 'react-element',
      } as WebComponentWrapperOptions,
    },]
  },
  { path:'**', component: PageNotFoundComponent , pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



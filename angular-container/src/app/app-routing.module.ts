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
      path: 'angular',
      loadChildren: () =>
        loadRemoteModule({
          type: 'module',
          remoteEntry: 'http://localhost:4201/remoteEntry.js',
          exposedModule: './angularMFE'
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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



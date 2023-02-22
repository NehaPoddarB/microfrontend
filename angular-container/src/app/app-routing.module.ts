import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  WebComponentWrapper, WebComponentWrapperOptions
} from '@angular-architects/module-federation-tools';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component:MainComponent,
    children: [  {
      path: 'angular',
      loadChildren: () =>
        loadRemoteModule({
          type: 'module',
          remoteEntry: 'http://localhost:4201/remoteEntry.js',
          exposedModule: './angularMFE'
        })
          .then((m: any) => m.AppModule)
    },
    {
      path: 'react',
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



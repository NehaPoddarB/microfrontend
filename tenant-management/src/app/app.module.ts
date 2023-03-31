import {  CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { CreateTenantComponent } from './create-tanent/create-tenant.component';
// import { WebButton } from 'button/Button-web-component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
   CreateTenantComponent,
  //  WebButton,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
   ModalModule.forRoot(),
   ToastrModule.forRoot({"positionClass": "toast-top-center"})
  ],
schemas:[CUSTOM_ELEMENTS_SCHEMA],
providers: [],
 bootstrap: [AppComponent],
})
export class AppModule { }

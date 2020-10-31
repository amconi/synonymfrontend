import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HomeModule } from './home/home.module';
import { SynonymModule } from './administration/synonym/synonym.module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    SideBarComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    HomeModule,
    SynonymModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

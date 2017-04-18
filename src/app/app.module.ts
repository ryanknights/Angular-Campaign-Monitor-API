import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { CmApiService } from './cm-api.service';
import { ClientsComponent } from './clients/clients.component';

const ROUTES = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'clients',
    component: ClientsComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [CmApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

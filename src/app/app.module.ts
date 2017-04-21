import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { HttpService } from './http.service';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { CmApiService } from './cm-api.service';
import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './client/client.component';
import { ClientResolve } from './client/client.resolve';
import { ClientDraftEmailsComponent } from './client-draft-emails/client-draft-emails.component';
import { ClientNewEmailComponent } from './client-new-email/client-new-email.component';

const ROUTES = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'clients',
    component: ClientsComponent
  },
  {
    path: 'clients/:clientid',
    component: ClientComponent,
    resolve : {
      client: ClientResolve
    }
  }
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientsComponent,
    ClientComponent,
    ClientDraftEmailsComponent,
    ClientNewEmailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    CmApiService, 
    ClientResolve,
    {
      provide: Http,
      useClass: HttpService
    }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }

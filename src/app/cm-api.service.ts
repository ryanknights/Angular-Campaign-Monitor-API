import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//import { HttpService } from './http.service';
import 'rxjs/add/operator/map';

@Injectable()
export class CmApiService {

  constructor(private http: Http) { }

  getClients() {
  	return this.http.get('/api/clients')
  		.map(res => res.json());
  }

  getClient(clientid) {
  	return this.http.get(`/api/client/${clientid}`)
  		.map(res => res.json());
  }

  newEmail(clientid, data) {
  	return this.http.post(`/api/client/${clientid}/newemail`, data)
  		.map(res => res.json());
  }

}

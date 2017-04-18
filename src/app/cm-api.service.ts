import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CmApiService {

  constructor(private http: Http) { }

  getClients() {
  	return this.http.get('/api/clients')
  		.map(res => res.json());
  }

}

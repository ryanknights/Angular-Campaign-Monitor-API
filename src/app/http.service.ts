import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';

@Injectable()
export class HttpService extends Http {

  constructor(backend: XHRBackend, options: RequestOptions) { 
  	let token = localStorage.getItem('auth_token');
  	options.headers.set('Authorization', `Bearer ${token}`);
  	super(backend, options);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    console.log('Before Request');
  	let token = localStorage.getItem('auth_token');
  	if (typeof url === 'string') {
  		if (!options) {
  			options = { headers: new Headers() };
  		}
  		options.headers.set('Authorization', `Bearer ${token}`);
  	} else {
  		url.headers.set('Authorization', `Bearer ${token}`);
  	}
  	return super.request(url, options)
  		.do((res: Response) => {
  			console.log('Successful Request');
  		}, (error: any) => {
  			console.log('Error Request');
	  		if (error.status === 401 || error.status === 403) {
	  			console.log('401 or 403');
	  		}
  		}, () =>
  		{
  			console.log('Completed Successful Request');
  		})
  		.finally(() =>
  		{
  			console.log('Ended Request');
  		})
  		.catch(this.catchError(this));
  }

  private catchError(self: HttpService) {
  	return (res: Response) => {
  		return Observable.throw(res);
  	}
  }

}

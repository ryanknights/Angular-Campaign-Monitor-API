import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CmApiService } from '../cm-api.service';

@Injectable()
export class ClientResolve implements Resolve<any> 
{
	constructor(private cmApiService: CmApiService) {}

	resolve(route: ActivatedRouteSnapshot) 
	{
		return this.cmApiService.getClient(route['params']['clientid']);
	} 
}
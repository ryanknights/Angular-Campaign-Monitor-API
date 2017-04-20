import { Component, OnInit } from '@angular/core';
import { CmApiService } from '../cm-api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  
	clients: any = [];

  constructor(private cmApiService: CmApiService) { }

  ngOnInit() { 
  	this.cmApiService.getClients().subscribe(clients =>
  	{
  		this.clients = clients;
  	});
  }

}

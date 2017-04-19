import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmApiService } from '../cm-api.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

	client: any = {}
	clientid: string;

  constructor(private cmApiService: CmApiService, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.params.subscribe(params =>
  	{
  		this.clientid = params['clientid'];

	  	this.cmApiService.getClient(this.clientid).subscribe(client =>
	  	{
	  		this.client = client;
	  	});  	  		
  	});
  }

  draftsChange(drafts)
  {
    console.log(drafts);
    console.log(this.client.drafts);
    this.client.drafts = drafts;
    console.log(this.client.drafts);
  }
}

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
  data: any;

  constructor(private cmApiService: CmApiService, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.client = this.route['snapshot']['data']['client'];
    this.clientid = this.client.clientData.BasicDetails.ClientID;
  }

  draftsChange(newDraft)
  {
    this.client.drafts.unshift(newDraft);
  }
}

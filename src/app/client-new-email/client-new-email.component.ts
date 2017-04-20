import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import { CmApiService } from '../cm-api.service';

@Component({
  selector: 'client-new-email',
  templateUrl: './client-new-email.component.html',
  styleUrls: ['./client-new-email.component.css']
})
export class ClientNewEmailComponent implements OnInit {

	@Input()
	client: any;

	@Input()
	lists: any;

	@Input()
	templates: any;

	@Input()
	clientid: string;

  @Output()
  newDraftSubmitted = new EventEmitter();

	email: {} = {
		name: '',
		subject: '',
		fromname: '',
		fromemail: '',
		replyto: '',
    templateid: ''
	}

  constructor(private cmApiService: CmApiService) { }

  ngOnInit() {
  }

  onSubmit({ value, valid })
  {
  	let data = new URLSearchParams();

  	data.append('name', value.name);
  	data.append('subject', value.subject);
  	data.append('fromname', value.fromname);
  	data.append('fromemail', value.fromemail);
  	data.append('replyto', value.replyto);
    data.append('templateid', value.templateid);

  	const selectedLists = this.getSelectedLists();

  	selectedLists.forEach((list) =>
  	{
  		data.append('lists', list.ListID);
  	});

  	this.cmApiService.newEmail(this.clientid, data)
  		.subscribe(data =>
  		{
        const newDraft = 
        {
          CampaignID: data.campaignid,
          Name: value.name,
          Subject: value.subject,
          FromName: value.fromname,
          FromEmail: value.fromemail,
          ReplyTo: value.replyto,
          DateCreated: new Date(Date.now()).toLocaleString(),
          PreviewURL : 'pending',
          PreviewTextURL: 'pending'
        };

  			this.newDraftSubmitted.emit(newDraft);
  		});
  }

  onListChange (list)
  {
  	list.selected = !list.selected;
  }

  getSelectedLists ()
  {
  	return this.lists.filter(list => list.selected);
  }
}

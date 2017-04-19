import { Component, OnInit, Input } from '@angular/core';
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

	email: {} = {
		name: '',
		subject: '',
		fromname: '',
		fromemail: '',
		replyto: ''
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

  	const selectedLists = this.getSelectedLists();

  	selectedLists.forEach((list) =>
  	{
  		data.append('lists', list.ListID);
  	});

  	console.log(this.client);

  	this.cmApiService.newEmail(this.clientid, data)
  		.subscribe(data =>
  		{
  			console.log(data);
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

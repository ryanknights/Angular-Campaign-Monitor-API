import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'client-draft-emails',
  templateUrl: './client-draft-emails.component.html',
  styleUrls: ['./client-draft-emails.component.css']
})
export class ClientDraftEmailsComponent implements OnInit {

  @Input()
  emails: any = [];

  constructor() { }

  ngOnInit() {

  }

}

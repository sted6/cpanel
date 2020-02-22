import { Component, OnInit } from '@angular/core';

import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/client.model';
import { AccountEvent } from 'src/app/models/account-event';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  accountEvents: AccountEvent[];


  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
      this.accountEvents = client.accountEvents;
      this.getBalance(client);
    });
  }

  getBalance(client: Client){
    this.client.balance = 0;
    for (let x = 0; x < this.client.accountEvents.length; x++) {
      if(this.client.accountEvents[x].type === 'Deposit') {
        this.client.balance = this.client.balance + this.client.accountEvents[x].amount;
      } else if (this.client.accountEvents[x].type === 'Withdrawal'){
        this.client.balance = this.client.balance - this.client.accountEvents[x].amount;
      }
    }
    this.clientService.updateClient(client);
  }

  removeEvent(event: AccountEvent, client: Client) {
    const index = this.client.accountEvents.indexOf(event);
    this.client.accountEvents.splice(index,1);
    this.clientService.updateClient(client);
  }

}

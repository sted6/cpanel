import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AccountEvent } from 'src/app/models/account-event';
import { ClientService } from 'src/app/services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { Timestamp } from '@firebase/firestore-types';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';


@Component({
  selector: 'app-new-account-event',
  templateUrl: './new-account-event.component.html',
  styleUrls: ['./new-account-event.component.scss']
})
export class NewAccountEventComponent implements OnInit {
  modalRef: BsModalRef;
  accountEvent: AccountEvent = {
    type: 'Deposit',
    amount: 0,
    date: new Date()
  }
  id?: string;
  client: Client;

  constructor(
    private modalService: BsModalService, 
    private clientService: ClientService, 
    private flashMessage: FlashMessagesService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => this.client = client);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmit({value, valid}: {value: AccountEvent, valid: boolean}){
    if(!valid) {
      this.flashMessage.show('Please fill out the form corretly.', {cssClass: 'alert-danger', timeout: 4000});
    } else {
      this.accountEvent = value;
      this.accountEvent.date = new Date();
      this.client.accountEvents.push(this.accountEvent);
      this.updateBalance(value);
      this.clientService.updateClient(this.client);
      //Show message
      this.flashMessage.show('New Account Event Added', {cssClass: 'alert-success', timeout: 4000});
      //Redirect
      this.modalRef.hide();
      this.router.navigate(['/client/'+this.id]);
    }
  }

  updateBalance(event: AccountEvent){
    if(event.type === 'Deposit') {
      this.client.balance += event.amount;
    } else if (event.type === 'Withdrawal') {
      this.client.balance = this.client.balance - event.amount;
    }
  }

}

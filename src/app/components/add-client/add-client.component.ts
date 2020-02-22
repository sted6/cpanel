import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Client } from 'src/app/models/client.model';


import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  modalRef: BsModalRef;

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    accountRep: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
    balance: 0,
    socialSecurity: '',
    accountEvents: []
  }

  // @ViewChild('clientForm', { static: false }) form: any;

  constructor(private modalService: BsModalService, private flashMessage: FlashMessagesService, private clientService: ClientService, private router: Router) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}){
    // if(this.disableBalanceOnAdd) {
    //   value.balance = 0;
    // }

    if(!valid) {
      this.flashMessage.show('Please fill out the form corretly.', {cssClass: 'alert-danger', timeout: 4000});
    } else {
      //Add new client
      this.clientService.newClient(this.client);
      //Show message
      this.flashMessage.show('New Client Added', {cssClass: 'alert-success', timeout: 4000});
      //Redirect
      this.router.navigate(['/dashboard']);
      this.modalRef.hide();
    }
  }

}

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Client } from 'src/app/models/client.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  modalRef: BsModalRef;

  id: string = '';

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

  constructor(
    private modalService: BsModalService,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
    ) {}

  ngOnInit() {
    // Get id from url
    this.id = this.route.snapshot.params['id'];
    this.client.id = this.id;
    // Cet client
    this.clientService.getClient(this.id).subscribe(client => this.client = client);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if(!valid) {
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // Add id to client
      value.id = this.id;
      // Update client
      this.clientService.updateClient(this.client);
      this.flashMessage.show('Client updated', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.modalRef.hide();
      this.router.navigate(['/client/'+this.id]);
    }
  }
}
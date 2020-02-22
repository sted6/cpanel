import { Component, OnInit } from '@angular/core';

import { ClientService } from '../../services/client.service';
import { Client } from 'src/app/models/client.model';



@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  totalBalance: number;
  modalOpen: boolean = false;
  userIsAdmin: boolean = false;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.getTotalBalance();
    });
  }

  getTotalBalance() {
    this.totalBalance = this.clients.reduce((x,y) => {
      return Number(x) + Number(y.balance);
    }, 0);
  }

  onClick() {
    this.modalOpen = !this.modalOpen;
  }

  deleteClient(client: Client) {
    if(this.userIsAdmin)
    this.clientService.deleteClient(client);
    else
    this.notAuthorized();
  }

  notAuthorized(){
    alert("You don't have access to do that!")
  }

}

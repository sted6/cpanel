import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Client } from '../models/client.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;


  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('Clients', doc => doc.orderBy('lastName', 'asc'));
  }

  getClients(): Observable<Client[]> {
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map(changes => changes.map(action => {
        const data = action.payload.doc.data() as Client;
        data.id = action.payload.doc.id;
        return data;
      }))
    );
    return this.clients;
  }

  newClient(client: Client) {
    this.clientsCollection.add(client);
  }

  getClient(id: String): Observable<Client> {
    this.clientDoc = this.afs.doc<Client>('Clients/'+id);

    this.client = this.clientDoc.snapshotChanges().pipe(
      map(action => {
        if(action.payload.exists === false) {
          console.log("Data is missing.")
          return null;
        } else {
          const data = action.payload.data() as Client;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.client;
  }

  updateClient(client: Client) {
    this.afs.doc('Clients/'+client.id).update(client);
  }

  deleteClient(client: Client) {
    this.afs.doc('Clients/'+client.id).delete();
  }
}

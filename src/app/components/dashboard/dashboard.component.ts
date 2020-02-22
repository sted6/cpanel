import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private db: AngularFirestore) {
    
   }

  ngOnInit() {
  }


}

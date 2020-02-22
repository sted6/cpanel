import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  isLoggedIn: boolean;
  currentUser: string;

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.isLoggedIn = true;
        this.currentUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

}

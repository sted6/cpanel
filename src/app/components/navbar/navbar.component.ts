import { Component, OnInit, ApplicationRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isCollapsed: boolean = true;
  isLoggedIn: boolean;
  currentUser: string;
  // showRegister: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private ref: ApplicationRef
    ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.isLoggedIn = true;
        this.currentUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });

    // this.showRegister = this.settingsService.getSettings().allowRegistration;
  }

  logoutOnClick() {
    this.isLoggedIn = false;
    this.currentUser = undefined;
    this.ref.tick();
    this.authService.logout();
    this.flashMessage.show('You have been logged out', {
      cssClass: 'alert-success', timeout: 4000
    });
    this.router.navigate(['/']);
  }

}

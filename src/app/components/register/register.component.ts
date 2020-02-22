import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.router.navigate(['/']);
      }
    })
  }

  onSubmit() {
    this.authService.register(this.email, this.password)
    .then(res => {
      this.flashMessage.show('You are now logged in!',{
        cssClass: 'alert-success', timeout: 4000
      });
    })
    .catch(err => {
      this.flashMessage.show(err.message,{
        cssClass: 'alert-danger', timeout: 4000
      });
    });
  }

}

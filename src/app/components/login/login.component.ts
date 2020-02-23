import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
    ) { }

    authForm = new FormGroup({
      email: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ])
      }
    );

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.router.navigate(['/']);
      }
    })
  }

  onSubmit() {
    this.authService.login(this.authForm.value.email, this.authForm.value.password)
        .then(res => {
        this.flashMessage.show('You are now logged in!',{
          cssClass: 'alert-success', timeout: 4000
        });
        this.router.navigate(['/dashboard']);
      })
      .catch(err => {
        this.flashMessage.show(err.message,{
          cssClass: 'alert-danger', timeout: 4000
      });
    });
  }
}

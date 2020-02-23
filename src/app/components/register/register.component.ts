import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from 'src/app/validators/match-password';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private matchPassword: MatchPassword
    ) { }

  authForm = new FormGroup({
    email: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)
    ]),
    passwordConfirm: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)
    ]),
    },
    {
      validators: [this.matchPassword.validate]
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
    if (this.authForm.invalid) {
      return;
    }
    console.log(this.authForm.value);
    this.authService.register(this.authForm.value.email, this.authForm.value.password)
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

import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/internal/Observable';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


@Injectable(
//   {
//   providedIn: 'root'
// }
)
export class AuthService {
  user: Observable<User>;
  signedin$ = new BehaviorSubject(false);

  constructor(private afAuth: AngularFireAuth) {}

   register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
      err => reject(err))
    });
  }

  login(email: string, password: string) {
    this.signedin$.next(true);
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
      err => {
        reject(err);
        console.log(err)
      })
    });
  }

  getAuth() {
    return this.afAuth.authState.pipe(
      tap((response) => {
        console.log(response);
      }),
      map(auth => auth));
  }

  logout() {
    this.afAuth.auth.signOut();
    this.signedin$.next(false);
  }

}

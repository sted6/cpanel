import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';


@Injectable(
//   {
//   providedIn: 'root'
// }
)
export class AuthService {
  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth) {}

   register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
      err => reject(err))
    });
  }

  login(email: string, password: string) {
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
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}

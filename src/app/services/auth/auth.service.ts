import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user/user.model';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth = false;
  userData: DocumentData | undefined;
  constructor(
    private router: Router,
    private auth: Auth,
    private userService: UserService
  ) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.userService
          .getUserByID(user.uid)
          .then((data) => (this.userData = data));
        this.router.navigate(['/liste']);
      } else {
        this.router.navigate(['']);
      }
    });
  }

  form = new FormGroup({
    uid: new FormControl(''),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    phoneNumber: new FormControl(''),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  createUser(data: IUser) {
    createUserWithEmailAndPassword(this.auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        data.uid = user.uid;
        this.userService.createProfileUser(user.uid, data);
        this.router.navigate(['/liste']);
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
        // ..
      });
  }

  signIn(data: IUser) {
    signInWithEmailAndPassword(this.auth, data.email, data.password).catch(
      (err) => err.message
    );
  }

  disconnect() {
    signOut(this.auth);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isAuth) return true;
    else return this.router.navigate(['auth']);
  }
}

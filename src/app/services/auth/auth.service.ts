import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
  ) {}

  form = new UntypedFormGroup({
    uid: new UntypedFormControl('', Validators.required),
    firstname: new UntypedFormControl('', Validators.required),
    lastname: new UntypedFormControl('', Validators.required),
    city: new UntypedFormControl('', Validators.required),
    phoneNumber: new UntypedFormControl('', Validators.required),
    email: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required),
  });

  createUser(data: IUser) {
    createUserWithEmailAndPassword(this.auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        data.uid = user.uid;
        this.userService.createProfileUser(user.uid, data);
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
        // ..
      });
  }

  signIn(data: IUser) {
    signInWithEmailAndPassword(this.auth, data.email, data.password);
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userService
          .getUserByID(user.uid)
          .then((data) => (this.userData = data));
      } else {
        console.log('User is signed in');
      }
    });
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

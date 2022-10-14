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
  updateProfile,
  signOut,
} from 'firebase/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IUser, IUserProfile } from 'src/app/models/user/user.model';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth = false;
  constructor(
    private router: Router,
    private auth: Auth,
    private firestore: Firestore,
    private userService: UserService
  ) {}

  form = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  createUser(data: IUser) {
    createUserWithEmailAndPassword(this.auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        this.userService.createProfileUser(user.uid, data);
        // updateProfile(user, {
        //   displayName: `${data.firstname}`,
        //   photoURL: 'https://example.com/jane-q-user/profile.jpg',
        // }).catch((error) => {
        //   console.error(error.code);
        // });
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
        // ..
      });
  }

  signIn(data: IUser) {
    signInWithEmailAndPassword(this.auth, data.email, data.password).then();
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

  // createProfileUser(uid: string, user: IUserProfile) {
  //   user.uid = uid;
  //   const userProfileRef = collection(this.firestore, 'UserProfiles');
  //   return addDoc(userProfileRef, user);
  // }
}

import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { DocumentData } from '@angular/fire/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from 'src/app/models/user/user.model';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth = false;
  currentUserSubject = new BehaviorSubject<IUser | null>(null);
  userData!: DocumentData;
  constructor(
    private router: Router,
    private auth: Auth,
    private userService: UserService
  ) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUserSubject.next(user as IUser);
        this.userService
          .getUserByID(user.uid)
          .then((data) => (this.userData = data as DocumentData));
      } else {
        this.router.navigate(['']);
      }
    });
  }

  form = new FormGroup({
    uid: new FormControl(''),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    phone: new FormControl(''),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmation_password: new FormControl('', Validators.required),
    bankAccount: new FormControl(0, Validators.required),
  });

  async signupUser(data: IUser): Promise<void> {
    return createUserWithEmailAndPassword(this.auth, data.email, data.password)
      .then((userCredential) => {
        const creationAt = userCredential.user.metadata.creationTime;
        const memberSince = new Date(creationAt!);

        data.uid = userCredential.user.uid;
        data = { ...data, memberSince };

        this.userService.createProfileUser(data.uid, data);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  }

  async signinUser(data: IUser) {
    return signInWithEmailAndPassword(this.auth, data.email, data.password)
      .then((user) => console.log('Service Auth signinUser ->', user))
      .catch((err) =>
        console.error('Error Service Auth signinUser ->', err.message)
      );
  }

  async signOutUser() {
    return signOut(this.auth)
      .then(() => {
        this.currentUserSubject.next(null);
      })
      .catch((error) => {
        console.error('Erreur lors de la déconnexion', error);
      });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isAuth) return true;
    else return this.router.navigate(['auth']);
  }
}

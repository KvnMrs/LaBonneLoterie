import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DocumentData } from '@angular/fire/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { IUser } from 'src/app/models/user/user.model';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSubject = new BehaviorSubject<IUser | null>(null);
  userDataSubject = new BehaviorSubject<DocumentData | null>(null);
  currentUser = this.auth.currentUser;

  constructor(
    private router: Router,
    private userService: UserService,
    public auth: Auth
  ) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUserSubject.next(user as IUser);

        this.userService.getUserByID(user.uid).then((data) => {
          this.userDataSubject.next(data);
        });
      } else {
        this.router.navigate(['']);
      }
    });
  }

  async signupUser(data: IUser): Promise<void> {
    return createUserWithEmailAndPassword(this.auth, data.email, data.password)
      .then((userCredential) => {
        const memberSince = userCredential.user.metadata.creationTime as string;
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
    return signInWithEmailAndPassword(
      this.auth,
      data.email,
      data.password
    ).catch((err) =>
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
}

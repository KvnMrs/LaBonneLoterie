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
  public currentUserSubject = new BehaviorSubject<IUser | null>(null);
  public userDataSubject = new BehaviorSubject<DocumentData | null>(null);
  public currentUser = this.auth.currentUser;
  public errorMessage: string | null = null;

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

  async signupUser(data: IUser): Promise<string | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        data.email,
        data.password
      );
      const memberSince = userCredential.user.metadata.creationTime as string;
      data.uid = userCredential.user.uid;
      data = { ...data, memberSince };
      await this.userService.createProfileUser(data.uid, data);
      this.router.navigate(['/recherche']);
      return null;
    } catch (error: any) {
      const errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === 'auth/email-already-in-use') {
        errorMessage = 'Un compte existe déjà avec cet Email.';
        return errorMessage;
      }
    }
    return null;
  }

  signinUser(data: IUser) {
    try {
      signInWithEmailAndPassword(this.auth, data.email, data.password);
      this.router.navigate(['/recherche']);
      return null;
    } catch (error: any) {
      const errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        errorMessage = 'Le mot de passe entré est inccorect.';
        return errorMessage;
      }
    }
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

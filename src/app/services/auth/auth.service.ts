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
  userData!: DocumentData;
  constructor(
    private router: Router,
    private auth: Auth,
    private userService: UserService
  ) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
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
    phoneNumber: new FormControl(''),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmation_password: new FormControl('', Validators.required),
    bankAccount: new FormControl(0, Validators.required),
  });

  isLoggedIn(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          this.userService
            .getUserByID(user.uid)
            .then((data) => {
              this.userData = data as DocumentData;
              this.router.navigate(['/recherche']);
              observer.next(true);
              observer.complete();
            })
            .catch((error) => {
              console.log('2');

              console.error(
                'Erreur lors de la récupération des données utilisateur:',
                error
              );
              observer.error(false);
              observer.complete();
            });
        } else {
          this.router.navigate(['']);
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

  async createUser(data: IUser): Promise<void> {
    return createUserWithEmailAndPassword(this.auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const creationAt = userCredential.user.metadata.creationTime;
        const memberSince = new Date(creationAt!);
        data.uid = userCredential.user.uid;
        data = { ...data, memberSince };
        this.userService.createProfileUser(data.uid, data);
        this.router.navigate(['/recherche']);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  }

  signIn(data: IUser) {
    signInWithEmailAndPassword(this.auth, data.email, data.password).catch(
      (err) => err.message
    );
  }

  disconnect() {
    signOut(this.auth)
      .then(() => {
        // Disconnection successfull
        console.log('Utilisateur déconnecté');
        this.router.navigate(['/connexion']);
      })
      .catch((error) => {
        // Disconnection error
        console.log('Erreur lors de la déconnexion', error);
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

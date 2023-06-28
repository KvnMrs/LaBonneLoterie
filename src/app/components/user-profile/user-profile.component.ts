import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  public stars = [1, 2, 3, 4, 5];
  public currentUserSubscritpion!: Subscription;
  public currentUser!: IUser;
  public profileData!: DocumentData;
  modalUpdateProfile = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // this.initCurrentUser();
    this.profileData = this.authService.userData;
  }

  // initCurrentUser(): void {
  //   this.currentUserSubscritpion =
  //     this.authService.currentUserSubject.subscribe({
  //       next: (user) => (this.currentUser = <IUser>user),
  //       error: console.error,
  //     });
  // }

  getUpdateUserProfile(e: String) {
    console.log(e);
  }

  ngOnDestroy(): void {
    this.currentUserSubscritpion.unsubscribe();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  public stars = [1, 2, 3, 4, 5];
  public currentUserSubscritpion!: Subscription;
  public currentUser!: IUser;
  public userData: IUser | null = null;
  modalUpdateProfile = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.userDataSubject.subscribe((user) => {
      this.userData = user;
    });
  }

  getUpdateUserProfile(updatedData: IUser): void {
    this.authService.userDataSubject.next(updatedData);
    this.userData = updatedData;
  }

  onDisconnect() {
    this.authService
      .signOutUser()
      .then(() => this.router.navigate(['/connexion']));
  }

  ngOnDestroy() {}
}

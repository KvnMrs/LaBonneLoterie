import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentData } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public stars = [1, 2, 3, 4, 5];
  public currentUserSubscritpion!: Subscription;
  public currentUser!: IUser;
  public userData: DocumentData | null = null;
  modalUpdateProfile = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.authService.userDataSubject.subscribe(
      (data) => (this.userData = data)
    );
  }

  getUpdateUserProfile(updatedData: DocumentData): void {
    this.userData = updatedData;
    this.authService.userDataSubject.next(this.userData);
  }

  onDisconnect() {
    this.authService
      .signOutUser()
      .then(() => this.router.navigate(['/connexion']));
  }
}

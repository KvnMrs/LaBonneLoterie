import { Component, OnInit } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public stars = [1, 2, 3, 4, 5];
  public currentUserSubscritpion!: Subscription;
  public currentUser!: IUser;
  public profileData!: DocumentData;
  modalUpdateProfile = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.profileData = this.authService.userData;
  }

  getUpdateUserProfile(updatedData: DocumentData): void {
    this.profileData = updatedData;
    this.authService.userData = this.profileData;
  }
}

import { Component, OnInit } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public stars = [1, 2, 3, 4, 5];
  public profileData!: DocumentData;
  modalUpdateProfile = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.profileData = this.authService.userData;
    this.profileData['memberSince'] = new Date(
      this.profileData['memberSince']['seconds']
    );
  }
}

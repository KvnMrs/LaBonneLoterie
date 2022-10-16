import { Component, OnInit } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public stars = [1, 2, 3, 4, 5];
  public profileData: DocumentData | undefined;
  modalUpdateProfile = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.profileData = this.authService.userData;
  }

  updateProfile() {
    this.modalUpdateProfile = true;
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public stars = [1, 2, 3, 4, 5];
  modalUpdateProfile = false;
  constructor() {}

  ngOnInit(): void {}

  updateProfile() {
    this.modalUpdateProfile = true;
  }
}

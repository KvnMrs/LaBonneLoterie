import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public isDropdownVisible: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn();
  }

  onDisconnect() {
    this.authService.disconnect();
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
}

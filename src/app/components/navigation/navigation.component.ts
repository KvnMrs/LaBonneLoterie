import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public isDropdownVisible: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onDisconnect() {
    this.authService.disconnect();
    this.router.navigate(['']);
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
}

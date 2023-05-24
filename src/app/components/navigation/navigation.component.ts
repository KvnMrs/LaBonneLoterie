import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public isLoggedIn$: Observable<boolean>;
  public isDropdownVisible: boolean = false;
  constructor(private authService: AuthService) {
    this.isLoggedIn$ = authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.authService.isLoggedIn();
  }

  async onDisconnect() {
    this.isLoggedIn$.subscribe((value: any) => {
      value = this.authService.isLoggedIn();
    });
    this.authService.disconnect();
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
}

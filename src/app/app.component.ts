import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public isLoggedIn$: Observable<boolean>;
  constructor(private authService: AuthService) {
    this.isLoggedIn$ = authService.isLoggedIn();
  }

  title = 'LeBonLot';
}

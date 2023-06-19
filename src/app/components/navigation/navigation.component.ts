import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUser } from '../../models/user/user.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  public currentUserSubscription!: Subscription;
  public currentUser!: IUser;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUserSubject.subscribe({
      next: (user) => {
        this.currentUser = user as IUser;
      },
      error: (error) => {
        console.error('Erreur récupération utilisateur.', error);
      },
    });
  }

  onDisconnect() {
    this.authService.disconnect();
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}

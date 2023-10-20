import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { IAnnounce } from 'src/app/models/annouce/annouce.model';
import { AnnouncesService } from 'src/app/services/announce/announces.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  public favoriteAnnounces: IAnnounce[] = [];
  public currentUser: User | null = null;
  favoriteAnnouncesSubscription: any;

  constructor(
    private router: Router,
    public userService: UserService,
    public announcesService: AnnouncesService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUserSubject.subscribe((user) => {
      this.currentUser = user;
      if (this.currentUser) {
        this.fetchFavorites(this.currentUser.uid);
      }
    });
  }

  fetchFavorites(userId: string) {
    this.favoriteAnnouncesSubscription = this.userService
      .getFavorites(userId)
      .subscribe((res: string[]) => {
        this.favoriteAnnounces = [];
        if (Array.isArray(res)) {
          const arrayAnnouncesId = res;
          arrayAnnouncesId.map(async (id) =>
            this.favoriteAnnounces.push(
              await this.announcesService.getAnnounceByID(id)
            )
          );
        } else {
          console.error('res:', res);
        }
      });
  }

  removeFromFavorites(announceId: string) {
    if (this.currentUser) {
      this.userService.removeFavorite(announceId, this.currentUser.uid);
      const index = this.favoriteAnnounces.findIndex(
        (announce) => announce.id === announceId
      );
      this.favoriteAnnounces.splice(index, 1);
    }
  }

  seeDetails(id: string) {
    this.router.navigate([`/liste/${id}`]);
  }

  deleteAnnouce(id: string) {
    this.announcesService.deleteAnnounce(id);
  }

  ngOnDestroy(): void {
    this.favoriteAnnouncesSubscription.unsubscribe();
  }
}

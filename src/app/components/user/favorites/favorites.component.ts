import { Component, OnInit, OnDestroy } from '@angular/core';
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
  public favoritesAnnounce: IAnnounce[] = [];
  public favoritesAnnounceIds: string[] = [];
  public currentUser: User | null = null;

  constructor(
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
    this.userService.getFavorites(userId).subscribe(async (res) => {
      if (res) {
        this.favoritesAnnounceIds = res['announces_id'];
        this.favoritesAnnounce = await this.announcesService.getAnnounceByIds(
          this.favoritesAnnounceIds
        );
      } else {
        console.error('res:', res);
      }
    });
  }

  removeFromFavorites(announceId: string) {
    if (this.currentUser) {
      this.userService.removeFavorite(announceId, this.currentUser.uid);
      const index = this.favoritesAnnounce.findIndex(
        (announce) => announce.id === announceId
      );
      this.favoritesAnnounce.splice(index, 1);
    }
  }

  deleteAnnouce(id: string) {
    this.announcesService.deleteAnnounce(id);
  }

  ngOnDestroy(): void {}
}

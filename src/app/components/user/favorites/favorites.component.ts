import { Component, OnInit } from '@angular/core';
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
export class FavoritesComponent implements OnInit {
  public favoriteAnnounces: IAnnounce[] = [];
  public currentUser: User | null = null;

  constructor(
    private router: Router,
    public userService: UserService,
    public announcesService: AnnouncesService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    if (!this.currentUser)
      return console.error('this.currentUser', this.currentUser);
    this.fetchFavorites(this.currentUser.uid);
  }

  fetchFavorites(userId: string) {
    this.userService.getFavorites(userId).subscribe((res) => {
      res.map(async (favoriteId) => {
        const favoriteAnnounce = await this.announcesService.getAnnounceByID(
          favoriteId
        );
        this.favoriteAnnounces.push(favoriteAnnounce);
        console.log('favoriteAnnounces');
      });
    });
  }

  removeFromFavorites(announce: IAnnounce) {
    console.log(announce);
  }

  seeDetails(id: string) {
    this.router.navigate([`/liste/${id}`]);
  }

  deleteAnnouce(id: string) {
    this.announcesService.deleteAnnounce(id);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAnnounce } from 'src/app/models/annouce/annouce.model';
import { AnnouncesService } from 'src/app/services/announce/announces.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  public favoriteAnnounces: IAnnounce[] = [];

  constructor(
    private router: Router,
    public announcesService: AnnouncesService
  ) {}

  ngOnInit(): void {
    this.fetchAnnounces();
  }

  fetchAnnounces() {
    this.announcesService.getAnnounces().subscribe((res: IAnnounce[]) => {
      this.favoriteAnnounces = res;
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

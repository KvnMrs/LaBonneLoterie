import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IAnnounce } from 'src/app/models/annouce/annouce.model';
import { IUser } from 'src/app/models/user/user.model';
import { AnnouncesService } from 'src/app/services/announce/announces.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() data: IAnnounce | null = null;
  addedToFavorite = false;
  public favorites$: Subscription = new Subscription();
  public favorites: string[] = [];
  public currentUser: IUser | null = null;

  @ViewChild('modalBuyTicket') modalBuyTicket!: ElementRef;

  constructor(
    private router: Router,
    public announcesService: AnnouncesService,
    public authService: AuthService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.userDataSubject.subscribe({
      next: (user) => {
        this.currentUser = user;
        if (this.currentUser) {
          this.fetchFavorites(this.currentUser.uid);
        }
      },
      error: (error) => {
        console.error('Error user.', error);
      },
    });
  }

  seeDetails() {
    if (!this.data) return console.error('announce details:', this.data!.id);
    this.router.navigate([`/liste/${this.data.id}`]);
  }

  deleteAnnouce(id: string) {
    this.announcesService.deleteAnnounce(id);
  }

  onAddFavorite(announceId: string) {
    if (!this.currentUser)
      return console.error('this.currentUser', this.currentUser);
    else
      return this.userService.addToFavorites(announceId, this.currentUser.uid);
  }

  fetchFavorites(userId: string) {
    this.favorites$ = this.userService
      .getFavorites(userId)
      .subscribe(async (res) => {
        if (res && this.data) {
          this.favorites = res['announces_id'];
          return this.favorites.includes(this.data.id)
            ? (this.addedToFavorite = true)
            : (this.addedToFavorite = false);
        } else {
          return this.favorites;
        }
      });
  }

  async removeFromFavorites(announceId: string, userId: string) {
    await this.userService.removeFavorite(announceId, userId);
    const index = this.favorites.findIndex((id) => id === announceId);
    this.favorites.splice(index, 1);
  }

  toggleFavorites(announceId: string, userId: string) {
    if (!this.addedToFavorite) {
      this.addedToFavorite = true;
      this.onAddFavorite(announceId);
    } else {
      this.addedToFavorite = false;
      this.removeFromFavorites(announceId, userId);
    }
  }

  buyTicket() {
    if (!this.data) return console.error('announce details:', this.data!.id);
    this.router.navigate([`/achat-ticket/${this.data.id}`]);
  }

  closeModal() {
    this.modalBuyTicket.nativeElement.checked = false;
  }

  ngOnDestroy(): void {
    this.favorites$.unsubscribe();
  }
}

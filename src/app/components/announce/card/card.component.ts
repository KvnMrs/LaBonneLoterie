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
  @ViewChild('modalBuyTicket') modalBuyTicket: ElementRef;
  @Input() data: IAnnounce;
  currentUser: IUser | null = null;
  favorites$: Subscription;
  favorites: string[];
  addedToFavorite = false;


  constructor(
    private router: Router,
    private announcesService: AnnouncesService,
    private authService: AuthService,
    private userService: UserService
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

  seeDetails(): void {
    if (!this.data) return console.error('announce details:', this.data);
    this.router.navigate([`/liste/${this.data.id}`]);
  }

  deleteAnnouce(id: string): Promise<void> {
    return this.announcesService.deleteAnnounceById(id);
  }

  onAddFavorite(announceId: string): Promise<void> | null  {
    if (!this.currentUser) {
      console.error('this.currentUser', this.currentUser);
      return null
    }
    else
      return this.userService.addToFavorites(announceId, this.currentUser.uid);
  }

  fetchFavorites(userId: string): IAnnounce[] | null  {
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
      return null
  }

  async removeFromFavorites(announceId: string, userId: string): Promise<void> {
    await this.userService.removeFavorite(announceId, userId);
    const index = this.favorites.findIndex((id) => id === announceId);
    this.favorites.splice(index, 1);
  }

  toggleFavorites(announceId: string, userId: string): Promise<void> | null {
    if (!this.addedToFavorite) {
      this.addedToFavorite = true;
      return this.onAddFavorite(announceId);
    } else {
      this.addedToFavorite = false;
      return this.removeFromFavorites(announceId, userId);
    }
  }

  buyTicket(): void {
    if (!this.data) return console.error('announce details:', this.data);
    this.router.navigate([`/achat-ticket/${this.data.id}`]);
  }

  closeModal(): void {
    this.modalBuyTicket.nativeElement.checked = false;
  }

  ngOnDestroy(): void {
    this.favorites$.unsubscribe();
  }
}

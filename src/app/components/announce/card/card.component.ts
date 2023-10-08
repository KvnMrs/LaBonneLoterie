import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IAnnounce } from 'src/app/models/annouce/annouce.model';
import { IUser } from 'src/app/models/user/user.model';
import { AnnouncesService } from 'src/app/services/announce/announces.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() data: IAnnounce | null = null;
  public currentUser: IUser | null = null;
  public addedToFavorite = false;

  @ViewChild('modalBuyTicket') modalBuyTicket!: ElementRef;

  constructor(
    private router: Router,
    public announcesService: AnnouncesService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.userDataSubject.subscribe({
      next: (user) => {
        this.currentUser = user as IUser;
      },
      error: (error) => {
        console.error('Erreur récupération utilisateur.', error);
      },
    });
  }

  seeDetails() {
    if (!this.data) return console.error('annonce details:', this.data!.id);
    this.router.navigate([`/liste/${this.data.id}`]);
  }

  deleteAnnouce(id: string) {
    this.announcesService.deleteAnnounce(id);
  }

  onAddFavorite(id: string) {
    console.log();

    return (this.addedToFavorite = !this.addedToFavorite);
  }

  buyTicket() {
    if (!this.data) return console.error('annonce details:', this.data!.id);
    this.router.navigate([`/achat-ticket/${this.data.id}`]);
  }

  closeModal() {
    this.modalBuyTicket.nativeElement.checked = false;
  }
}

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
  @Input() data!: IAnnounce;
  public currentUser: IUser | null = null;

  @ViewChild('modalBuyTicket') modalBuyTicket!: ElementRef;

  constructor(
    private router: Router,
    public annoucesService: AnnouncesService,
    public authService: AuthService
  ) {}

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

  seeDetails() {
    this.router.navigate([`/liste/${this.data.id}`]);
  }

  deleteAnnouce(id: string) {
    this.annoucesService.deleteAnnounce(id);
  }

  //TODO: create addFavorite logic/
  onAddFavorite() {}

  buyTicket() {
    this.router.navigate([`/achat-ticket/${this.data.id}`]);
  }

  closeModal() {
    this.modalBuyTicket.nativeElement.checked = false;
  }
}

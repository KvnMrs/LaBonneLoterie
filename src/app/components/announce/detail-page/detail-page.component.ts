import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentData } from 'firebase/firestore';
// Models
import { IAnnounce } from 'src/app/models/annouce/annouce.model';
import { IUser } from 'src/app/models/user/user.model';
// Service
import { AnnouncesService } from 'src/app/services/announce/announces.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
})
export class DetailPageComponent implements OnInit {
  @ViewChild('modalBuyTicket') modalBuyTicket!: ElementRef;
  public currentAnnounce: IAnnounce | null = null;
  public authorAnnounce: DocumentData | null = null;
  public currentUser: IUser | null = null;
  paramId: string = '';
  postedDate: any;

  constructor(
    private route: ActivatedRoute,
    private announcesService: AnnouncesService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.authService.userDataSubject.subscribe({
      next: (user) => {
        this.currentUser = user as IUser;
      },
      error: (error) => {
        console.error('Erreur récupération utilisateur.', error);
      },
    });
    try {
      this.paramId = this.route.snapshot.params['id'];
      await this.fetchAnnounceById(this.paramId);
      if (!this.currentAnnounce) throw Error;
      this.postedDate = this.currentAnnounce.createdAt;
      this.currentAnnounce.createdAt = new Date(this.currentAnnounce.createdAt);
      await this.userService
        .getUserByID(this.currentAnnounce.authorUid)
        .then((data) => {
          if (!data) return;
          this.authorAnnounce = data;
        });
    } catch (error) {
      // TODO: error management - show an error message and redirect user
      console.error("Une erreur s'est produite :", error);
    }
  }

  async fetchAnnounceById(id: string): Promise<IAnnounce> {
    return (this.currentAnnounce = await this.announcesService.getAnnounceByID(
      id
    ));
  }

  closeModal() {
    this.modalBuyTicket.nativeElement.checked = false;
  }
}

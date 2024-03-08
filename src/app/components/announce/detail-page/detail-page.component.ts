import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
export class DetailPageComponent implements OnInit, OnDestroy {
  @ViewChild('modalBuyTicket') modalBuyTicket: ElementRef;
  currentAnnounce: IAnnounce;
  currentUser$: Subscription;
  currentUser: IUser | null = null;
  authorAnnounce: IUser;
  paramId: string;
  postedDate: number | Date;

  constructor(
    private route: ActivatedRoute,
    private announcesService: AnnouncesService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.currentUser$ = this.authService.userDataSubject.subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (error) => {
        console.error('Error occured: ', error);
      },
    });
    try {
      this.paramId = this.route.snapshot.params['id'];
      await this.fetchAnnounceById(this.paramId);
      if (!this.currentAnnounce) throw Error();
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
      console.error('Error occured: ', error);
    }
  }

  async fetchAnnounceById(id: string): Promise<IAnnounce> {
    return (this.currentAnnounce = await this.announcesService.getAnnounceByID(
      id
    ));
  }

  closeModal(): void {
    if (this.modalBuyTicket) {
      this.modalBuyTicket.nativeElement.checked = false;
    }
  }

  ngOnDestroy(): void {
    this.currentUser$.unsubscribe();
  }
}

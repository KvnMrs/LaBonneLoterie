import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { IAnnounce } from 'src/app/models/annouce/annouce.model';
import { AnnouncesService } from 'src/app/services/announce/announces.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-summary-announce',
  templateUrl: './summary-announce.component.html',
  styleUrls: ['./summary-announce.component.scss'],
})
export class SummaryAnnounceComponent implements OnInit {
  private dataSubscription: Subscription;
  newAnnounceData: IAnnounce | null;
  fullNameAuthor: string;

  constructor(
    public router: Router,
    private announcesService: AnnouncesService,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.dataSubscription = this.announcesService.announceData$.subscribe(
      async (data) => {
        if (!data) return console.error('Error with announce data.')
        this.newAnnounceData = data;
        const announceAuthor = await this.userService.getUserByID(
          this.newAnnounceData.authorUid
        );
        if (!announceAuthor) throw Error;
        this.fullNameAuthor = `${
          announceAuthor['firstname'] +
          ' ' +
          announceAuthor['lastname'].toUpperCase()
        }`;
      }
    );
  }

  public redirectUser(): void {
    this.router.navigate(['/recherche']);
  }

  async onPublish(): Promise<void> {
    if (!this.newAnnounceData) throw Error;
    await this.announcesService.addAnnounce(this.newAnnounceData);
    this.newAnnounceData = null;
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}

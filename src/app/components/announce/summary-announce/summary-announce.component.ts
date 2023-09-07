import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { IAnnounce } from 'src/app/models/annouce/annouce.model';
import { AnnouncesService } from 'src/app/services/announce/announces.service';
import { UserService } from 'src/app/services/user/user.service';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-summary-announce',
  templateUrl: './summary-announce.component.html',
  styleUrls: ['./summary-announce.component.scss'],
})
export class SummaryAnnounceComponent implements OnInit {
  newAnnounceData: Partial<IAnnounce> | null = null;
  public fullNameAuthor: string | null = null;
  private dataSubscription!: Subscription;

  constructor(
    public router: Router,
    private annoucesService: AnnouncesService,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.dataSubscription = this.annoucesService.announceData$.subscribe(
      async (data) => {
        this.newAnnounceData = data;
        const announceAuthor = await this.userService.getUserByID(
          this.newAnnounceData.authorUid as string
        );
        if (!announceAuthor) throw Error;
        this.fullNameAuthor = `${
          announceAuthor['firstname'] +
          ' ' +
          announceAuthor['lastname'].toUpperCase()
        }`;
        console.log('announceAuthor', announceAuthor);
      }
    );
  }

  public redirectUser(): void {
    this.router.navigate(['/recherche']);
  }

  async onPublish(): Promise<void> {
    if (!this.newAnnounceData) throw Error;
    await this.annoucesService.addAnnounce(this.newAnnounceData);
    this.newAnnounceData = {};
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}

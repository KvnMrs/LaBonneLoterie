import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { IAnnounce } from 'src/app/models/annouce/annouce.model';
import { AnnouncesService } from 'src/app/services/announce/announces.service';

@Component({
  selector: 'app-summary-announce',
  templateUrl: './summary-announce.component.html',
  styleUrls: ['./summary-announce.component.scss'],
})
export class SummaryAnnounceComponent implements OnInit {
  newAnnounceData!: Partial<IAnnounce>;
  private dataSubscription!: Subscription;

  constructor(
    public router: Router,
    private annoucesService: AnnouncesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.dataSubscription = this.annoucesService.announceData$.subscribe(
      (data) => {
        this.newAnnounceData = data;
      }
    );
  }

  public redirectUser(): void {
    this.router.navigate(['/recherche']);
  }

  async onPublish(): Promise<void> {
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IAnnounce } from 'src/app/models/annouce/annouce.model';
import { AnnouncesService } from 'src/app/services/announces/announces.service';

@Component({
  selector: 'app-summary-announce',
  templateUrl: './summary-announce.component.html',
  styleUrls: ['./summary-announce.component.scss'],
})
export class SummaryAnnounceComponent implements OnInit {
  newAnnounceData!: IAnnounce;
  private dataSubscription!: Subscription;

  constructor(
    public router: Router,
    private annoucesService: AnnouncesService
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
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Models
import { IAnnounce } from 'src/app/models/annouce/annouce.model';
// Service
import { AnnouncesService } from 'src/app/services/announces/announces.service';

@Component({
  selector: 'app-announce-details',
  templateUrl: './announce-details.component.html',
  styleUrls: ['./announce-details.component.scss'],
})
export class AnnounceDetailsComponent implements OnInit {
  @ViewChild('modalBuyTicket') modalBuyTicket!: ElementRef;
  public currentAnnounce!: IAnnounce;
  paramId!: string;

  constructor(
    private route: ActivatedRoute,
    private announcesService: AnnouncesService
  ) {}

  ngOnInit(): void {
    this.paramId = this.route.snapshot.params['id'];
    this.fetchAnnounceById(this.paramId);
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

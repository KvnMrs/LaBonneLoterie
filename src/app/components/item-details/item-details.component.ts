import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentData } from 'firebase/firestore';
// Models
import { IAnnounce } from 'src/app/models/annouce/annouce.model';
// Service
import { AnnouncesService } from 'src/app/services/announces/announces.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent implements OnInit {
  public buyTicketModal = false;

  constructor(
    private route: ActivatedRoute,
    private announesService: AnnouncesService
  ) {}

  // retrieve id announce from URL
  paramId: string = this.route.snapshot.params['id'];

  // using SERVICE for retrieve informations of the announce by his ID
  announce: Promise<DocumentData | undefined> =
    this.announesService.getAnnounceByID(this.paramId);

  ngOnInit(): void {}

  onBuyTicketModal() {
    this.buyTicketModal = true;
    console.log(this.buyTicketModal);
  }
}

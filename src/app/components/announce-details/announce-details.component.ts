import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentData } from 'firebase/firestore';
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

  closeModal() {
    this.modalBuyTicket.nativeElement.checked = false;
  }
}

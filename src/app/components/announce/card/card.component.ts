import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IAnnounce } from 'src/app/models/annouce/annouce.model';
import { AnnouncesService } from 'src/app/services/announce/announces.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() data!: IAnnounce;

  @ViewChild('modalBuyTicket') modalBuyTicket!: ElementRef;

  constructor(
    private router: Router,
    public annoucesService: AnnouncesService
  ) {}

  ngOnInit(): void {}

  seeDetails() {
    this.router.navigate([`/liste/${this.data.id}`]);
  }

  deleteAnnouce(id: string) {
    this.annoucesService.deleteAnnounce(id);
  }

  //TODO: create addFavorite logic/
  onAddFavorite() {
    console.log();
  }

  buyTicket(id: string) {
    this.router.navigate([`/achat-ticket/${this.data.id}`]);
  }

  closeModal() {
    this.modalBuyTicket.nativeElement.checked = false;
  }
}

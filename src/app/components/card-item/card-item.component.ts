import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnouncesService } from 'src/app/services/announces/announces.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent implements OnInit {
  @Input() id!: string;
  @Input() name!: string;
  @Input() category!: string;
  @Input() description!: string;
  @Input() img?: string;
  @Input() minTickets?: number | string | undefined;
  @Input() currentTickets: number | string | undefined;

  constructor(
    private router: Router,
    public annoucesService: AnnouncesService
  ) {}

  ngOnInit(): void {}

  seeDetails() {
    this.router.navigate([`/liste/${this.id}`]);
  }

  deleteAnnouce(id: string) {
    this.annoucesService.deleteAnnounce(id);
  }

  buyTicket(id: string) {
    this.router.navigate([`/achat-ticket/${this.id}`]);
  }
}

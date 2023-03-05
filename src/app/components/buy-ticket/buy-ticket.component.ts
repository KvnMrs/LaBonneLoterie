import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentData } from 'firebase/firestore';
import { AnnouncesService } from 'src/app/services/announces/announces.service';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.scss'],
})
export class BuyTickectComponent implements OnInit {
  id!: string;
  public formTicket!: UntypedFormGroup;
  public numberTicket: number = 0;
  public totalPrice: number = 0;
  public currentAnnounce: DocumentData | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private announcesService: AnnouncesService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.id = params['id'];
      await this.announcesService
        .getAnnounceByID(this.id)
        .then((data) => (this.currentAnnounce = data));
    });
  }

  selectTicket() {
    var input = document.querySelector('#numberTicket') as HTMLInputElement;
    this.numberTicket = parseInt(input.value);
    this.totalPrice =
      this.numberTicket * this.currentAnnounce?.['oneTicketPrice'];
  }
  buyTickets() {
    this.announcesService.updateAnnouceTickets(this.id, this.numberTicket);
    this.router.navigate(['/liste']);
  }
}

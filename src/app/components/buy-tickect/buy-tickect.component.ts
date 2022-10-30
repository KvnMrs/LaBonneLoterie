import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentData } from 'firebase/firestore';
import { IAnnounce } from 'src/app/models/annouce/annouce.model';
import { AnnouncesService } from 'src/app/services/announces/announces.service';

@Component({
  selector: 'app-buy-tickect',
  templateUrl: './buy-tickect.component.html',
  styleUrls: ['./buy-tickect.component.scss'],
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
  buyTicket() {
    if (this.numberTicket < 1) return;
    else {
      this.announcesService.buyTicket(this.id, this.numberTicket);
      this.router.navigate(['/liste']);
    }
  }
}

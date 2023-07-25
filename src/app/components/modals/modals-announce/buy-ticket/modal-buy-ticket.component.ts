import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentData } from 'firebase/firestore';
import { AnnouncesService } from 'src/app/services/announces/announces.service';

@Component({
  selector: 'app-modal-buy-ticket',
  templateUrl: './modal-buy-ticket.component.html',
  styleUrls: ['./modal-buy-ticket.component.scss'],
})
export class ModalBuyTickectComponent implements OnInit {
  id: string = ' ';
  public buyTicketForm: FormGroup = new FormGroup(0, Validators.required);
  public numberTicket: number = 0;
  public totalPrice: number = 0;
  public currentAnnounce: DocumentData | null = null;
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

  onChange() {
    // var input = document.querySelector('#numberTicket') as HTMLInputElement;
    // this.numberTicket = parseInt(input.value);
    // this.totalPrice = this.numberTicket * this.currentAnnounce?.['ticketPrice'];
  }
  onBuyTickets() {
    this.announcesService.updateAnnouceTickets(this.id, this.numberTicket);
    this.buyTicketForm.reset();
    this.router.navigate(['/liste']);
  }
}

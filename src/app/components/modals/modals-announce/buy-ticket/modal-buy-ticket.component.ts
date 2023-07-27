import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAnnounce } from 'src/app/models/annouce/annouce.model';
// Services
import { AnnouncesService } from 'src/app/services/announces/announces.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-modal-buy-ticket',
  templateUrl: './modal-buy-ticket.component.html',
  styleUrls: ['./modal-buy-ticket.component.scss'],
})
export class ModalBuyTickectComponent implements OnInit {
  @Input() currentAnnounce!: IAnnounce;
  id: string = ' ';
  public buyTicketForm: FormGroup = new FormGroup({
    numberTicketSelected: new FormControl(0, Validators.required),
  });
  public numberTicket: number = 0;
  public totalPrice: number = 0;
  constructor(
    private router: Router,
    private announcesService: AnnouncesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log(this.currentAnnounce);
  }

  onChange() {
    // var input = document.querySelector('#numberTicket') as HTMLInputElement;
    // this.numberTicket = parseInt(input.value);
    // this.totalPrice = this.numberTicket * this.currentAnnounce?.['ticketPrice'];
  }
  onBuyTickets() {
    try {
      const currentUser = this.authService.auth.currentUser;
      if (!currentUser) throw Error();
      const buyer = { id: currentUser.uid, email: currentUser.email };
      const announce = {
        id: this.currentAnnounce.id,
        ticketPrice: this.currentAnnounce.ticketPrice,
      };
      const otherInfos = {
        numberTicketBuyed: this.buyTicketForm.value.numberTicketSelected,
        date: new Date(),
      };
      this.announcesService.buyTicket(announce, buyer, otherInfos);
      this.buyTicketForm.reset();
    } catch (err) {
      // TODO: error management - show an error message buy ticket failed
      console.error(err);
    }
  }
}

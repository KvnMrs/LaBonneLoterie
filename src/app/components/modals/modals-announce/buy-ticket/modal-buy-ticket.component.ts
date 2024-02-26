import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@firebase/auth';
import { IAnnounce } from 'src/app/models/annouce/annouce.model';
// Services
import { AnnouncesService } from 'src/app/services/announce/announces.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-modal-buy-ticket',
  templateUrl: './modal-buy-ticket.component.html',
  styleUrls: ['./modal-buy-ticket.component.scss'],
})
export class ModalBuyTickectComponent implements OnInit {
  @Input() currentAnnounce: IAnnounce | null = null;
  id: string = ' ';
  public buyTicketForm: FormGroup = new FormGroup({
    numberTicketSelected: new FormControl(0, Validators.required),
  });
  purchasesInfo = {
    numberTicket: 0,
    totalPrice: 0,
  };
  constructor(
    private announcesService: AnnouncesService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  onChange(event: any) {
    if(!this.currentAnnounce) return console.error("not currentAnnounce found")
    this.purchasesInfo.numberTicket = event.target.value;
    this.purchasesInfo.totalPrice =
      this.purchasesInfo.numberTicket * this.currentAnnounce.ticketPrice;
  }
  async onBuyTickets() {
    try {
      if (!this.currentAnnounce) throw new Error('Error with the current announce data');
      const currentUser = this.authService.auth.currentUser;
      if (!currentUser) throw Error('Error with the current user');
      const buyer : Partial<User> = { uid: currentUser.uid, email: currentUser.email };
      const purchaseTickets = {
        userId: currentUser.uid,
        ticketsBuyed: this.buyTicketForm.value.numberTicketSelected,
        buyedAt : new Date().toLocaleString(),
      };
      await this.announcesService.buyTickets(this.currentAnnounce.id, buyer, purchaseTickets);
      this.buyTicketForm.reset();
    } catch (err) {
      // TODO: error management - show an error message buy ticket failed
      console.error(err);
    }
  }
}

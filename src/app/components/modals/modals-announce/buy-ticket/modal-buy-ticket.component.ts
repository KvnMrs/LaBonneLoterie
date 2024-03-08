import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  @Input() currentAnnounce!: IAnnounce;
  id: string;
  buyTicketsForm: FormGroup;
  purchasesInfo = {
    numberTicket: 0,
    totalPrice: 0,
  };
  constructor(
    private announcesService: AnnouncesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initialiseBuyTicketsForm()
  }

  initialiseBuyTicketsForm(){
    return this.buyTicketsForm = new FormGroup({
      numberTicketSelected: new FormControl(0, Validators.required),
    });
  }
  onChange(event: any) {
    this.purchasesInfo.numberTicket = event.target.value;
    this.purchasesInfo.totalPrice =
      this.purchasesInfo.numberTicket * this.currentAnnounce.ticketPrice;
  }
  onBuyTickets() {
    try {
      const currentUser = this.authService.auth.currentUser;
      if (!currentUser) throw Error();
      const buyer = { id: currentUser.uid, email: currentUser.email };
      const announce: Partial<IAnnounce> = {
        id: this.currentAnnounce.id,
        ticketPrice: this.currentAnnounce.ticketPrice,
      };
      const otherInfos = {
        numberTicketBuyed: this.buyTicketsForm.value.numberTicketSelected,
        date: new Date(),
      };
      this.announcesService.buyTicket(announce, buyer, otherInfos);
      this.buyTicketsForm.reset();
    } catch (err) {
      // TODO: error management - show an error message buy ticket failed
      console.error(err);
    }
  }
}

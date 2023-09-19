import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentData } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'lbl-modal-withdraw',
  templateUrl: './modal-withdraw.component.html',
  styleUrls: ['./modal-withdraw.component.scss'],
})
export class ModalWithdrawComponent implements OnInit {
  public currentUserSubscription!: Subscription;
  public withdrawBankBalanceForm!: FormGroup;
  public currentUser: IUser | null = null;
  @Input() userData: DocumentData | null = null;
  @Output() withdrawEvent = new EventEmitter<DocumentData>();

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.withdrawBankBalanceForm = new FormGroup({
      bankAccount: new FormControl(0, Validators.required),
    });
    this.authService.currentUserSubject.subscribe({
      next: (user) => {
        this.currentUser = user as IUser;
      },
      error: (error) => {
        console.error('Erreur récupération utilisateur.', error);
      },
    });
  }

  async onWithdraw(): Promise<void> {
    try {
      if (!this.userData) throw Error;
      const sumToWithdraw = this.withdrawBankBalanceForm.value.bankAccount;
      const newBalanceBank = this.userData['bankAccount'] - sumToWithdraw;
      await this.userService.onCreditUserAccount(
        this.userData['uid'],
        newBalanceBank
      );
      await this.userService
        .getUserByID(this.userData['uid'])
        .then(
          (data) => (
            (this.userData = data as DocumentData),
            this.withdrawEvent.emit(this.userData as DocumentData),
            this.withdrawBankBalanceForm.reset()
          )
        );
    } catch (error) {
      console.log('onWithdraw Problem:', error);
    }
  }
}

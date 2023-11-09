import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'firebase/auth';
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
  public currentUserSubscription: Subscription | null = null;
  public withdrawBankBalanceForm!: FormGroup;
  public currentUser: User | null = null;
  @Input() userData: IUser | null = null;
  @Output() withdrawEvent = new EventEmitter<IUser>();

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.withdrawBankBalanceForm = new FormGroup({
      bankAccount: new FormControl(0, Validators.required),
    });
    this.authService.userDataSubject.subscribe({
      next: (user) => {
        if (!user) return console.error('user', user);
        this.currentUser = user;
      },
      error: (error) => {
        console.error('Erreur récupération utilisateur.', error);
      },
    });
  }

  async onWithdraw(): Promise<void> {
    if (!this.withdrawBankBalanceForm || !this.userData)
      return console.error(
        'this.withdrawBankBalanceForm || this.userData ',
        this.withdrawBankBalanceForm,
        this.userData
      );
    const sumToWithdraw: number =
      this.withdrawBankBalanceForm.value.bankAccount;
    const newBalanceBank = this.userData.bankAccount - sumToWithdraw;
    await this.userService.onCreditUserAccount(
      this.userData.uid,
      newBalanceBank
    );
    await this.userService
      .getUserByID(this.userData.uid)
      .then(
        (data) => (
          (this.userData = data),
          this.withdrawEvent.emit(this.userData as IUser),
          this.withdrawBankBalanceForm!.reset()
        )
      );
    await this.userService
      .getUserByID(this.userData['uid'])
      .then(
        (data) => (
          (this.userData = data),
          this.withdrawEvent.emit(this.userData as IUser),
          this.withdrawBankBalanceForm.reset()
        )
      );
  }
  catch(error: any) {
    console.error('onWithdraw Problem:', error);
  }
}

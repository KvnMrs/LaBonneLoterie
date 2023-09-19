import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentData } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'lbl-modal-credit-profile',
  templateUrl: './modal-credit-profile.component.html',
  styleUrls: ['./modal-credit-profile.component.scss'],
})
export class ModalCreditProfileComponent implements OnInit {
  public currentUserSubscription!: Subscription;
  public creditBankBalanceForm!: FormGroup;
  public currentUser!: IUser;
  @Input() userData!: DocumentData;
  @Output() creditBankBalanceEvent = new EventEmitter<DocumentData>();

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.creditBankBalanceForm = new FormGroup({
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

  async onCreditBankBalance(): Promise<void> {
    const sumToCredit =
      this.creditBankBalanceForm.value.bankAccount +
      this.userData['bankAccount'];
    await this.userService.onCreditUserAccount(
      this.userData['uid'],
      sumToCredit
    );
    this.userService
      .getUserByID(this.userData['uid'])
      .then(
        (data) => (
          (this.userData = data as DocumentData),
          this.creditBankBalanceEvent.emit(this.userData as DocumentData),
          this.creditBankBalanceForm.reset()
        )
      );
  }
}

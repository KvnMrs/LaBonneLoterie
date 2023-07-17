import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'lbl-modal-credit-profile',
  templateUrl: './modal-credit-profile.component.html',
  styleUrls: ['./modal-credit-profile.component.scss'],
})
export class ModalCreditProfileComponent implements OnInit {
  public currentUserSubscription!: Subscription;
  public creditBankBalanceForm!: FormGroup;
  public currentUser!: IUser;
  @Input() profileData: any;
  loading: boolean = false;

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

  onCreditBankBalance() {
    // this.userService.creditUserAccount(
    //   this.currentUser,
    //   this.creditForm.value.bankAccount
    // );
  }
}

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
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
export class ModalCreditProfileComponent implements OnInit, OnDestroy {
  public currentUserSubscription!: Subscription;
  public creditForm!: FormGroup;
  public currentUser!: IUser;
  @Input() profileData: any;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // this.authService.currentUserSubject;
    this.creditForm = new FormGroup({
      bankAccount: new FormControl(0, Validators.required),
    });
    this.authService.currentUserSubject.subscribe({
      next: (user) => {
        this.currentUser = user as IUser;
        console.log('this.currentUser --->', this.currentUser);
      },
      error: (error) => {
        console.error('Erreur récupération utilisateur.', error);
      },
    });
  }

  onCreditAcoount() {
    // console.log(this.currentUser);
    // console.log(this.creditForm.value.bankAccount);
    // this.userService.creditUserAccount(
    //   this.currentUser,
    //   this.creditForm.value.bankAccount
    // );
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}

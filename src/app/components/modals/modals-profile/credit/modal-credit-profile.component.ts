import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'lbl-modal-credit-profile',
  templateUrl: './modal-credit-profile.component.html',
  styleUrls: ['./modal-credit-profile.component.scss'],
})
export class ModalCreditProfileComponent implements OnInit {
  public creditForm!: FormGroup;
  private currentUser!: string;
  @Input() profileData: any;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.creditForm = new FormGroup({
      bankAccount: new FormControl(0, Validators.required),
    });
  }

  onCreditAcoount() {
    console.log(this.currentUser);
    console.log(this.creditForm.value.bankAccount);
    this.userService.creditUserAccount(
      this.currentUser,
      this.creditForm.value.bankAccount
    );
  }
}

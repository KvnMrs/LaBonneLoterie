import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user/user.model';
import { AuthService } from '../../../../services/auth/auth.service';
import {
  majorityCheckValidator,
  customEmailValidator,
} from 'src/app/shared/libs/forms/validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  showError: boolean = false;
  errorMessage: string = '';
  public formSignUp: FormGroup = new FormGroup({
    uid: new FormControl(''),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    birthday: new FormControl('', [
      Validators.required,
      majorityCheckValidator,
    ]),
    city: new FormControl('', Validators.required),
    phone: new FormControl(''),
    email: new FormControl('', [Validators.required, customEmailValidator]),
    password: new FormControl('', Validators.required),
    confirmation_password: new FormControl('', Validators.required),
    bankAccount: new FormControl(0, Validators.required),
  });
  @Input() haveAccount!: boolean;
  @Output() onAccount = new EventEmitter<boolean>();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  public async onSubmitSignupForm(): Promise<void> {
    const dataUser: IUser = this.formSignUp.value;
    const trySignup = await this.authService.signupUser(dataUser);
    if (trySignup) {
      this.errorMessage = trySignup;
      this.showError = true;
    } else {
      this.showError = false;
      this.router.navigate(['/recherche']);
    }
  }

  closeAlert() {
    this.showError = false;
  }

  onHaveAccount() {
    this.onAccount.emit(this.haveAccount);
  }
}

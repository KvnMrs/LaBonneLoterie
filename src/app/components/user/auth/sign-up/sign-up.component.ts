import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user/user.model';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public formSignUp: FormGroup = new FormGroup({
    uid: new FormControl(''),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    phone: new FormControl(''),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmation_password: new FormControl('', Validators.required),
    bankAccount: new FormControl(0, Validators.required),
  });
  @Input() haveAccount!: boolean;
  @Output() onAccount = new EventEmitter<boolean>();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  public onSubmitSignupForm() {
    const dataUser: IUser = this.formSignUp.value;
    this.authService
      .signupUser(dataUser)
      .then(() => {
        this.router.navigate(['/recherche']);
      })
      .catch((error) => console.error('SIGNUP ERROR ==> ', error.message));
  }

  onHaveAccount() {
    this.onAccount.emit(this.haveAccount);
  }
}

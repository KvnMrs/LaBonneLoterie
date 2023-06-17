import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user/user.model';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public formSignUp!: FormGroup;
  @Input() haveAccount!: boolean;
  @Output() onAccount = new EventEmitter<boolean>();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.formSignUp = this.authService.form;
  }

  public onSubmitSignupForm() {
    const dataUser: IUser = this.formSignUp.value;
    this.authService
      .signupUser(dataUser)
      .then((user) => {
        this.router.navigate(['/recherche']);
      })
      .catch((error) => console.error('SIGNP ERROR ==> ', error.message));
  }

  onHaveAccount() {
    this.onAccount.emit(this.haveAccount);
  }
}

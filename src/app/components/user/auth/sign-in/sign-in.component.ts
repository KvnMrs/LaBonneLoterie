import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { customEmailValidator } from 'src/app/shared/libs/forms/validators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  showError: boolean = false;
  errorMessage: string = '';
  public signinForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, customEmailValidator]),
    password: new FormControl('', Validators.required),
  });
  @Input() haveAccount!: boolean;
  @Output() notHaveAccount = new EventEmitter<boolean>();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  initSignInForm(): void {
    this.signinForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  public async onSubmitSigninForm() {
    const dataUser = this.signinForm.value;
    const trySignIn = await this.authService.signinUser(dataUser);
    console.log('trySignIn', trySignIn);
    if (trySignIn) {
      this.errorMessage = trySignIn;
      this.showError = true;
    } else {
      this.showError = false;
      this.router.navigate(['/recherche']);
    }
  }

  onNotHaveAccount() {
    this.haveAccount = false;
    this.notHaveAccount.emit(this.haveAccount);
  }

  closeAlert() {
    this.showError = false;
  }
}

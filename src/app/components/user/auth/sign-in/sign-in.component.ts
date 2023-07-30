import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public signinForm!: FormGroup;
  @Input() haveAccount!: boolean;
  @Output() notHaveAccount = new EventEmitter<boolean>();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initSignInForm();
    this.signinForm = this.authService.form;
  }

  initSignInForm(): void {
    this.signinForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  public onSubmitSigninForm() {
    const dataUser = this.signinForm.value;
    this.authService
      .signinUser(dataUser)
      .then(() => this.router.navigate(['/recherche']))
      .catch((err) =>
        console.error('SignIn onSubmitSigninForm() error -->', err.message)
      );
  }

  onNotHaveAccount() {
    this.haveAccount = false;
    this.notHaveAccount.emit(this.haveAccount);
  }
}
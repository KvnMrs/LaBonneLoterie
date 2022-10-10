import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public formAuth!: FormGroup;

  authStatus!: boolean;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authStatus = this.authService.isAuth;
    this.formAuth = this.authService.form;
  }

  public onCreateAccount() {
    const dataUser = this.formAuth.value;
    this.authService.createAccount(dataUser.email, dataUser.password);
    // this.authStatus = this.authService.isAuth;
    this.router.navigate(['/liste']);
  }

  public onSignOut() {
    this.authService.signOut();
    this.authStatus = this.authService.isAuth;
  }
}

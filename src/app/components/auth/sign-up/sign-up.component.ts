import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public formAuth!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.formAuth = this.authService.form;
  }

  public onCreateUser() {
    const dataUser = this.formAuth.value;
    this.authService.createUser(dataUser);
    this.router.navigate(['/liste']);
  }

  public onSignOut() {
    this.authService.signOut();
  }
}

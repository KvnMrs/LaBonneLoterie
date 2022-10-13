import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public formLogIn!: FormGroup;
  @Input() haveAccount!: boolean;
  @Output() notHaveAccount = new EventEmitter<boolean>();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.formLogIn = this.authService.form;
  }

  public onLogIn() {
    const dataUser = this.formLogIn.value;
    this.authService.createUser(dataUser);
    this.router.navigate(['/liste']);
  }

  onNotHaveAccount() {
    this.haveAccount = false;
    this.notHaveAccount.emit(this.haveAccount);
  }
}

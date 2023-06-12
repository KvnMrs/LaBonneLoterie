import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'lbl-modal-credit-profile',
  templateUrl: './modal-credit-profile.component.html',
  styleUrls: ['./modal-credit-profile.component.scss'],
})
export class ModalCreditProfileComponent implements OnInit {
  public creditForm!: FormGroup;
  @Input() profileData: any;
  loading: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.creditForm = this.authService.form;
  }

  OnCreditAcoount() {
    console.log(this.creditForm.value);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lbl-alert-error',
  templateUrl: './lbl-error.component.html',
  styleUrls: ['./lbl-error.component.scss'],
})
export class LblErrorComponent implements OnInit {
  @Input() errorMessage: string;
  @Input() showError = false;
  @Output() closed = new EventEmitter<boolean>(false);
  constructor() {}

  ngOnInit(): void {}

  closeAlert() {
    this.closed.emit();
  }
}

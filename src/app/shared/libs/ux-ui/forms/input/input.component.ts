import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lbl-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() for: string = '';
  @Input() label: string = '';
  @Input() type: string = '';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() formControlName: string = '';
  @Input() autocomplete: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Output() formControlNameValue = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  emitFormControlName() {
    this.formControlNameValue.emit(this.formControlName);
  }
}

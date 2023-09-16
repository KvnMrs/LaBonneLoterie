import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-cross-add',
  templateUrl: './svg-cross-add.component.svg',
  styleUrls: ['./svg-cross-add.component.scss'],
})
export class SvgCrossAddComponent implements OnInit {
  @Input() color?: string = 'black';
  @Input() size?: string = '30';
  constructor() {}

  ngOnInit(): void {
    this.color !== 'black' ? (this.color = this.color) : '';
    this.size !== '30' ? (this.size = this.size) : '';
    this.size?.toString();
  }
}

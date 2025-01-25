import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-search',
  templateUrl: './svg-search.component.svg',
  styleUrls: ['./svg-search.component.scss'],
})
export class SvgSearchComponent implements OnInit {
  @Input() color = "white"
  constructor() { }

  ngOnInit(): void { }
}

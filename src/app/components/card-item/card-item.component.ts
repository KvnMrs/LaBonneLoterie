import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {

  @Input() name : string | undefined
  @Input() category : string | undefined
  @Input() description : string | undefined
  @Input() price : number | string | undefined
  constructor() { }

  ngOnInit(): void {
  }

}

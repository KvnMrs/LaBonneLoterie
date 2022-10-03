import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {

  @Input() id : number | string | undefined
  @Input() name : string | undefined
  @Input() category : string | undefined
  @Input() description : string | undefined
  @Input() minTickets : number | string | undefined
  @Input() currentTickets : number | string | undefined

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  seeDetails() {
    this.router.navigate([`/liste/${this.id}`])
  }

}

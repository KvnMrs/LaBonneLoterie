import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary-announce',
  templateUrl: './summary-announce.component.html',
  styleUrls: ['./summary-announce.component.scss'],
})
export class SummaryAnnounceComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  public redirectUser() {
    this.router.navigate(['']);
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-add-to-favorites',
  templateUrl: './svg-add-to-favorites.component.svg',
  styleUrls: ['./svg-add-to-favorites.component.scss'],
})
export class SvgAddToFavoritesComponent implements OnInit {
  @Input() addedToFavorite = false;
  constructor() {}

  ngOnInit(): void {}
}

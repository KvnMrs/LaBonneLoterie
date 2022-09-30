import { Component, OnInit } from '@angular/core';
import { AnnouncesService } from '../../services/announces/announces.service';
import {annouceModel} from '../../models/annouce/annouce.model'

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {

  public items: annouceModel[] = [];
  constructor(private announesService : AnnouncesService) { }

  ngOnInit(): void {
    this.items = this.announesService.myAnnouces
  }

}

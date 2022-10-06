import { Component, OnInit } from '@angular/core';
import { AnnouncesService } from '../../services/announces/announces.service';
import { IAnnounce } from '../../models/annouce/annouce.model';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent implements OnInit {
  public items: IAnnounce[] = [];
  constructor(private announesService: AnnouncesService) {}

  ngOnInit(): void {
    // using SERVICE for retrieve informations of all announces
    this.announesService.getAnnounces().subscribe((res: IAnnounce[]) => {
      this.items = res;
    });
  }
}

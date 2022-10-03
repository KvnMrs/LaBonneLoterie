import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Models
import { annouceModel } from 'src/app/models/annouce/annouce.model';
// Service
import { AnnouncesService } from 'src/app/services/announces/announces.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  public currentItem!: annouceModel;
  constructor(private route: ActivatedRoute, private announesService : AnnouncesService) { }

  ngOnInit(): void {
      const id: number = this.route.snapshot.params['id'];
      this.currentItem = this.announesService.findItemByID(id);
      console.log(this.currentItem)
  }

}

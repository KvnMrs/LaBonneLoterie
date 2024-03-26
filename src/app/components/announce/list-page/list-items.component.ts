import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// Services
import { AnnouncesService } from '../../../services/announce/announces.service';
// Models
import { IAnnounce } from '../../../models/annouce/annouce.model';
import { AnnounceCategories } from 'src/app/shared/libs/enums/announces.enum';
// Rxjs
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent implements OnInit, OnDestroy {
  announces$: Subscription;
  announces: IAnnounce[] = [];
  searchForm: FormGroup;
  categories = Object.values(AnnounceCategories);
  showResetBtn = false;

  constructor(private announcesService: AnnouncesService) {}

  ngOnInit(): void {
    this.fetchAnnounces();
    this.initSearchForm();
  }

  fetchAnnounces() {
    return (this.announces$ = this.announcesService
      .getAnnounces()
      .subscribe((res: IAnnounce[]) => {
        this.announces = res;
      }));
  }

  initSearchForm() {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      category: new FormControl(null),
      minPrice: new FormControl(),
      maxPrice: new FormControl(),
    });
  }

  async onSearch(): Promise<IAnnounce[]> {
    this.showResetBtn = true;
    return (this.announces = await this.announcesService.filterAnnounces(
      this.searchForm.value
    ));
  }

  onResetSearch(): void {
    this.fetchAnnounces();
    this.searchForm.reset();
    this.showResetBtn = false;
  }

  ngOnDestroy(): void {
    this.announces$.unsubscribe();
  }
}

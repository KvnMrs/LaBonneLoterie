import { Component, OnInit } from '@angular/core';
import { AnnouncesService } from '../../../services/announce/announces.service';
import { IAnnounce } from '../../../models/annouce/annouce.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent implements OnInit {
  public announces: IAnnounce[] = [];
  public searchForm!: FormGroup;
  public showResetBtn = false;

  public categorys = [
    { id: 1, name: 'Vêtement' },
    { id: 2, name: 'Véhicule' },
    { id: 3, name: 'Multimédia' },
    { id: 4, name: 'Décoration' },
    { id: 5, name: 'Electomenager' },
    { id: 6, name: 'Jardin' },
  ];

  constructor(private announcesService: AnnouncesService) {}
  ngOnInit(): void {
    this.fetchAnnounces();
    this.initSearchForm();
  }

  fetchAnnounces() {
    this.announcesService.getAnnounces().subscribe((res: IAnnounce[]) => {
      this.announces = res;
    });
  }

  initSearchForm() {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      category: new FormControl(null),
      minPrice: new FormControl(),
      maxPrice: new FormControl(),
    });
  }

  async onSearch(): Promise<void> {
    this.announces = await this.announcesService.filterAnnounces(
      this.searchForm.value
    );
    this.showResetBtn = true;
  }

  onResetSearch() {
    this.fetchAnnounces();
    this.searchForm.reset();
    this.showResetBtn = false;
  }
}

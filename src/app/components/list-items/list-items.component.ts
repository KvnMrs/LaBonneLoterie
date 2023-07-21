import { Component, OnInit } from '@angular/core';
import { AnnouncesService } from '../../services/announces/announces.service';
import { IAnnounce } from '../../models/annouce/annouce.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent implements OnInit {
  public announces: IAnnounce[] = [];
  public searchForm!: FormGroup;

  public categorys = [
    { id: 1, name: 'Vêtement' },
    { id: 2, name: 'Véhicule' },
    { id: 3, name: 'Multimédia' },
    { id: 4, name: 'Décoration' },
    { id: 5, name: 'Electomenager' },
    { id: 6, name: 'Jardin' },
  ];

  constructor(private announesService: AnnouncesService) {}
  ngOnInit(): void {
    // using SERVICE for retrieve informations of all announces
    this.announesService.getAnnounces().subscribe((res: IAnnounce[]) => {
      this.announces = res;
    });
    this.initSearchForm();
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
    this.announces = await this.announesService.filterAnnounces(
      this.searchForm.value
    );
  }
}

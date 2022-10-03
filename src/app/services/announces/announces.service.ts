import { Injectable } from '@angular/core';
import { annouceModel } from '../../models/annouce/annouce.model'

@Injectable({
  providedIn: 'root'
})
export class AnnouncesService {
  myAnnouces : annouceModel[] = [
    {
      id:1,
      name: "test1",
      category: "category1",
      description:"description1",
      minTickets: 10,
      currentTickets: 0
    },
    {
      id:2,
      name: "test2",
      category: "category2",
      description:"description2",
      minTickets: 40,
      currentTickets: 3
    }, {
      id:3,
      name: "test3",
      category: "category3",
      description:"description3",
      minTickets: 24,
      currentTickets: 10
    },
  ]
  constructor() { }

  addItem(item: annouceModel ) {
   return this.myAnnouces.push(item)
  }

  findItemByID( id: number) {
   return this.myAnnouces[id - 1]
  }
}

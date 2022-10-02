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
      price: 1,

    },
    {
      id:2,
      name: "test2",
      category: "category2",
      description:"description2",
      price: 2,

    }, {
      id:3,
      name: "test3",
      category: "category3",
      description:"description3",
      price: 3,

    },
  ]
  constructor() { }

  addItem(item: annouceModel ) {
   return this.myAnnouces.push(item)
  }
}

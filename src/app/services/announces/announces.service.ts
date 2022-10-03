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
      img:"https://www.backmarket.fr/cdn-cgi/image/format=auto,quality=75,width=750/https://d1eh9yux7w8iql.cloudfront.net/product_images/1557727435.46.jpg",
      minTickets: 10,
      currentTickets: 0
    },
    {
      id:2,
      name: "test2",
      category: "category2",
      description:"description2",
      img:"https://www.backmarket.fr/cdn-cgi/image/format=auto,quality=75,width=750/https://d1eh9yux7w8iql.cloudfront.net/product_images/1557727435.46.jpg",
      minTickets: 40,
      currentTickets: 3
    }, {
      id:3,
      name: "test3",
      category: "category3",
      description:"description3",
      img:"https://www.backmarket.fr/cdn-cgi/image/format=auto,quality=75,width=750/https://d1eh9yux7w8iql.cloudfront.net/product_images/1557727435.46.jpg",
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

import { Injectable } from '@angular/core';
import { collection, collectionData, doc, DocumentData, DocumentSnapshot, Firestore, getDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IAnnounce } from '../../models/annouce/annouce.model'

@Injectable({
  providedIn: 'root'
})
export class AnnouncesService {
  // myAnnouces : annouceModel[] = [
  //   {
  //     id:1,
  //     name: "test1",
  //     category: "category1",
  //     description:"description1",
  //     img:"https://www.backmarket.fr/cdn-cgi/image/format=auto,quality=75,width=750/https://d1eh9yux7w8iql.cloudfront.net/product_images/1557727435.46.jpg",
  //     minTickets: 10,
  //     currentTickets: 0
  //   },
  //   {
  //     id:2,
  //     name: "test2",
  //     category: "category2",
  //     description:"description2",
  //     img:"https://www.backmarket.fr/cdn-cgi/image/format=auto,quality=75,width=750/https://d1eh9yux7w8iql.cloudfront.net/product_images/1557727435.46.jpg",
  //     minTickets: 40,
  //     currentTickets: 3
  //   }, {
  //     id:3,
  //     name: "test3",
  //     category: "category3",
  //     description:"description3",
  //     img:"https://www.backmarket.fr/cdn-cgi/image/format=auto,quality=75,width=750/https://d1eh9yux7w8iql.cloudfront.net/product_images/1557727435.46.jpg",
  //     minTickets: 24,
  //     currentTickets: 10
  //   },
  // ]
  constructor(private firestore : Firestore) { }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    img_url: new FormControl('', Validators.required),
    minTickets: new FormControl(0),
    currentTickets: new FormControl(0),
  })

    // getAllAnnounce
    public getAnnounces(): Observable<IAnnounce[]> {
      const announceRef = collection(this.firestore, 'Announces');
      return collectionData(announceRef, { idField: 'id' }) as Observable<IAnnounce[]>;
    }

      // getGameById
    public async getAnnounceByID(id: string ){
      const announceRef = doc(this.firestore, `Announces`, id);
      const DOC_SNAP: DocumentSnapshot<DocumentData> = await getDoc(announceRef);
      return DOC_SNAP.data();
  }

//   addItem(item: annouceModel ) {
//    return this.myAnnouces.push(item)
//   }

//   findItemByID( id: number) {
//    return this.myAnnouces[id - 1]
//   }
}

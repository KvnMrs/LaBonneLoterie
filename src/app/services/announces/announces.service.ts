import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, DocumentData, DocumentSnapshot, Firestore, getDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IAnnounce } from '../../models/annouce/annouce.model'

@Injectable({
  providedIn: 'root'
})
export class AnnouncesService {
 
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

    // getAnnounceById
    public async getAnnounceByID(id: string ){
      const announceRef = doc(this.firestore, `Announces`, id);
      const DOC_SNAP: DocumentSnapshot<DocumentData> = await getDoc(announceRef);
      return DOC_SNAP.data();
  }

    // addAnnounce
    public addAnnounce(announce: IAnnounce) {
      console.log("annnounce ---> ", announce)
      const announceRef = collection(this.firestore, 'Announces');
      return addDoc(announceRef, announce);
    }
}

import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  DocumentData,
  DocumentSnapshot,
  Firestore,
  getDoc,
} from '@angular/fire/firestore';
import { setDoc } from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAnnounce } from '../../models/annouce/annouce.model';

@Injectable({
  providedIn: 'root',
})
export class AnnouncesService {
  private announceDataSubject: BehaviorSubject<any> =
    new BehaviorSubject<IAnnounce | null>(null);
  public announceData$: Observable<IAnnounce> =
    this.announceDataSubject.asObservable();
  constructor(private firestore: Firestore) {}

  // getAllAnnounce
  public getAnnounces(): Observable<IAnnounce[]> {
    const announceRef = collection(this.firestore, 'Announces');
    return collectionData(announceRef, { idField: 'id' }) as Observable<
      IAnnounce[]
    >;
  }

  // getAnnounceById
  public async getAnnounceByID(id: string) {
    const announceRef = doc(this.firestore, `Announces`, id);
    const DOC_SNAP: DocumentSnapshot<DocumentData> = await getDoc(announceRef);
    return DOC_SNAP.data();
  }

  // addAnnounce
  public addAnnounce(announce: IAnnounce) {
    const announceRef = collection(this.firestore, 'Announces');
    return addDoc(announceRef, announce);
  }

  // deleteAnnounceById
  deleteAnnounce(id: string) {
    const announceDocRef = doc(this.firestore, `Announces/${id}`);
    return deleteDoc(announceDocRef);
  }

  async updateAnnouceTickets(id: string, numberTicketsBuyed: number) {
    let actualisationTickets: number;
    const announceRef = doc(this.firestore, `Announces`, id);
    const announce = await this.getAnnounceByID(id).then((res) => res);
    actualisationTickets = announce?.['currentTickets'] + numberTicketsBuyed;
    announce!['currentTickets'] = actualisationTickets;
    const data = { currentTickets: announce!['currentTickets'], ...announce };
    return setDoc(announceRef, data);
  }

  emitAnnounceData(data: IAnnounce) {
    this.announceDataSubject.next(data);
  }
}

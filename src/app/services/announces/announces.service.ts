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
import { getDocs, query, where } from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAnnounce } from '../../models/annouce/annouce.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AnnouncesService {
  private announceDataSubject: BehaviorSubject<any> =
    new BehaviorSubject<IAnnounce | null>(null);
  public announceData$: Observable<IAnnounce> =
    this.announceDataSubject.asObservable();

  private announcesDataSubject: BehaviorSubject<any> = new BehaviorSubject<
    IAnnounce[] | null
  >(null);
  public announcesData$: Observable<IAnnounce> =
    this.announcesDataSubject.asObservable();
  constructor(private firestore: Firestore, private authService: AuthService) {}

  // getAllAnnounce
  public getAnnounces(): Observable<IAnnounce[]> {
    const announceRef = collection(this.firestore, 'Announces');
    return collectionData(announceRef, { idField: 'id' }) as Observable<
      IAnnounce[]
    >;
  }

  // getAnnounceById
  public async getAnnounceByID(id: string): Promise<IAnnounce> {
    const announceRef = doc(this.firestore, `Announces`, id);
    const DOC_SNAP: DocumentSnapshot<DocumentData> = await getDoc(announceRef);
    return DOC_SNAP.data() as IAnnounce;
  }

  // addAnnounce
  public addAnnounce(announce: IAnnounce) {
    let authorUid = '';
    this.authService.currentUserSubject.subscribe((user) => {
      if (!user) return;
      authorUid = user.uid;
    });
    const timestamp = Date.now();
    const createdAt = new Date(timestamp);
    announce = { ...announce, createdAt, authorUid };
    const announceRef = collection(this.firestore, 'Announces');
    return addDoc(announceRef, announce);
  }

  // deleteAnnounceById
  deleteAnnounce(id: string) {
    const announceDocRef = doc(this.firestore, `Announces/${id}`);
    return deleteDoc(announceDocRef);
  }

  async buyTicket(announce: any, buyer: any, numberTicketsBuyed: number) {
    const relation = { announce, buyer, numberTicketsBuyed };
    // const announceRef = collection(this.firestore, 'Announces');
    // return addDoc(announceRef, announce);

    // let actualisationTickets: number;
    // const announceRef = doc(this.firestore, `Announces`, id);
    // const announce = await this.getAnnounceByID(id).then((res) => res);
    // TODO: See back this part, problem was created since getAnnounceByID return an observable

    // actualisationTickets = announce?.['currentTickets'] + numberTicketsBuyed;
    // announce!['currentTickets'] = actualisationTickets;
    // const data = { currentTickets: announce!['currentTickets'], ...announce };
    // return setDoc(announceRef, data);
  }

  emitAnnounceData(data: IAnnounce) {
    this.announceDataSubject.next(data);
  }

  async filterAnnounces(search: any): Promise<IAnnounce[]> {
    let resultSearch: IAnnounce[] = [];
    // TODO: filter title a nnounce by word
    if (search.search) {
      const q = query(
        collection(this.firestore, 'Announces'),
        where('title', 'array-contains', search.search)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const announce = doc.data();
        resultSearch.push(announce as IAnnounce);
      });
    }
    if (search.category) {
      const q = query(
        collection(this.firestore, 'Announces'),
        where('category', '==', search.category)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const announce = doc.data();
        resultSearch.push(announce as IAnnounce);
      });
    }
    if (search.minPrice) {
      const q = query(
        collection(this.firestore, 'Announces'),
        where('ticketPrice', '>', search.minPrice)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const announce = doc.data();
        resultSearch.push(announce as IAnnounce);
      });
    }
    if (search.maxPrice) {
      const q = query(
        collection(this.firestore, 'Announces'),
        where('ticketPrice', '<', search.maxPrice)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const announce = doc.data();
        resultSearch.push(announce as IAnnounce);
      });
    }
    return resultSearch;
  }
}

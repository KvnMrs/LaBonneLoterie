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
import { getDocs, query, setDoc, where } from 'firebase/firestore';
import { BehaviorSubject, interval, map, Observable } from 'rxjs';
import { IAnnounce } from '../../models/annouce/annouce.model';
import { AuthService } from '../auth/auth.service';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AnnouncesService {
  private announceDataSubject = new BehaviorSubject<Partial<IAnnounce>>({
    title: '',
    category: '',
    tags: [],
    description: '',
    imgsAnnounce: [],
    estimate: 0,
    ticketPrice: 0,
    minTickets: 0,
    maxTickets: 0,
    currentTickets: 0,
    createdAt: new Date(),
    authorUid: '',
    endAt: { date: null, timestamp: new Date().getTime() },
  });
  public announceData$: Observable<Partial<IAnnounce>> =
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
  public addAnnounce(announce: Partial<IAnnounce>) {
    const timestamp = Date.now();
    const newAnnounce: Partial<IAnnounce> = {
      title: announce.title,
      category: announce.category,
      tags: announce.tags,
      description: announce.description,
      imgsAnnounce: announce.imgsAnnounce,
      estimate: announce.estimate,
      ticketPrice: announce.ticketPrice,
      minTickets: announce.minTickets,
      maxTickets: announce.maxTickets,
      currentTickets: announce.currentTickets,
      createdAt: new Date(timestamp),
      endAt: announce.endAt,
      authorUid: announce.authorUid,
    };
    const announceRef = collection(this.firestore, 'Announces');
    return addDoc(announceRef, newAnnounce);
  }

  // deleteAnnounceById
  deleteAnnounce(id: string) {
    const announceDocRef = doc(this.firestore, `Announces/${id}`);
    return deleteDoc(announceDocRef);
  }

  async buyTicket(announce: any, buyer: Partial<User>, otherInfos: any) {
    // Create purchase relation.
    const relation = { announce, buyer, otherInfos };
    const purchasesRef = collection(this.firestore, 'purchases');
    await addDoc(purchasesRef, relation);
    // Update 'currentTickets' value of the announce.
    const announceRef = doc(this.firestore, `Announces`, announce.id);
    const announceCurrrentData = await this.getAnnounceByID(announce.id).then(
      (res) => res
    );
    const actualisationTickets =
      announceCurrrentData?.['currentTickets'] + otherInfos.numberTicketBuyed;

    announceCurrrentData['currentTickets'] = actualisationTickets;
    return setDoc(announceRef, announceCurrrentData);
  }

  emitAnnounceData(data: Partial<IAnnounce>) {
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
  createTimerObservable(initialDate: number): Observable<number> {
    return interval(1000).pipe(map(() => initialDate - Date.now()));
  }
}

import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
} from '@angular/fire/firestore';
import { DocumentData, documentId, DocumentReference, getDocs, query, setDoc, where } from 'firebase/firestore';
import { BehaviorSubject, interval, map, Observable } from 'rxjs';
import { IAnnounce } from '../../models/annouce/annouce.model';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AnnouncesService {
  private announcesDataSubject: BehaviorSubject<any> = new BehaviorSubject<
  IAnnounce[] | null>(null);
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
    createdAt: Date.now(),
    authorUid: '',
    endAt: 0,
    endHour: 0,
  });
  announceData$: Observable<Partial<IAnnounce>> =
    this.announceDataSubject.asObservable();
  announcesData$: Observable<IAnnounce> =
    this.announcesDataSubject.asObservable();

  constructor(private firestore: Firestore) {}

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
    const docSnap = await getDoc(announceRef);
    const data = docSnap.data();
    return data as IAnnounce;
  }

  public async getAnnounceByIds(ids: string[]): Promise<IAnnounce[]> {
    const favorites: IAnnounce[] = [];
    if (!ids) return favorites;
    else {
      const announceRef = collection(this.firestore, `Announces`);
      const q = query(announceRef, where(documentId(), 'in', ids));
      const docsSnap = await getDocs(q);
      docsSnap.forEach((doc) => {
        let announce = doc.data() as IAnnounce;
        announce.id = doc.id;
        favorites.push(announce);
      });
      return favorites;
    }
  }

  // addAnnounce
  public addAnnounce(announce: Partial<IAnnounce>): Promise<DocumentReference<DocumentData>> | null   {
    try {
      if (!announce.endAt || !announce.endHour) throw Error;
      announce.endAt =
        new Date(announce.endAt).getTime() +
        announce.endHour -
        new Date().getTime();

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
        createdAt: Date.now(),
        endAt: announce.endAt,
        authorUid: announce.authorUid,
      };
      const announceRef = collection(this.firestore, 'Announces');
      return addDoc(announceRef, newAnnounce);
    } catch (err) {
      console.error('Problem with the announce data');
      return null
    }
  }

  // deleteAnnounceById
  deleteAnnounceById(id: string): Promise<void> {
    const announceDocRef = doc(this.firestore, `Announces/${id}`);
    return deleteDoc(announceDocRef);
  }

  async buyTicket(announce: any, buyer: Partial<User>, otherInfos: { numberTicketBuyed: number; date?: Date; }): Promise<void> {
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

  emitAnnounceData(data: Partial<IAnnounce>): void {
    return this.announceDataSubject.next(data);
  }

  async filterAnnounces(search: { search: string; category: string; minPrice: number; maxPrice: number; }): Promise<IAnnounce[]> {
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

  createTimerObservable(endDate: number): Observable<number> {
    let time = interval(1000).pipe(map(() => endDate - Date.now()));
    return time;
  }
}

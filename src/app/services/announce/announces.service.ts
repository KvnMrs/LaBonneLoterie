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
import { DocumentData, documentId, DocumentReference, getDocs, query, runTransaction, serverTimestamp, setDoc, Timestamp, where } from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAnnounce } from '../../models/annouce/annouce.model';
import { AnnounceStatus } from 'src/app/shared/libs/enums/announces.enum';

@Injectable({
  providedIn: 'root',
})
export class AnnouncesService {
  private announceDataSubject = new BehaviorSubject<IAnnounce | null>(null);
  private announcesDataSubject: BehaviorSubject<IAnnounce[] | null> = new BehaviorSubject<
    IAnnounce[] | null
  >(null);
  announceData$ = this.announceDataSubject.asObservable();
  announcesData$: Observable<IAnnounce[] | null> =
    this.announcesDataSubject.asObservable();

  constructor(private firestore: Firestore) {}

  public getAnnounces(): Observable<IAnnounce[]> {
    const announceRef = collection(this.firestore, 'Announces');
    return collectionData(announceRef, { idField: 'id' }) as Observable<
      IAnnounce[]
    >;
  }

  public async getAnnounceByID(id: string): Promise<IAnnounce> {
    const announceRef = doc(this.firestore, `Announces`, id);
    const docSnap = await getDoc(announceRef);
    const data = docSnap.data();
    return data as IAnnounce;
  }

  public async getAnnounceByIds(ids: string[]): Promise<IAnnounce[]>  {
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

  public addAnnounce(announce: IAnnounce) : Promise<DocumentReference<DocumentData>> | null {
    if (!announce.endDate) throw Error;
    else {
      try {
      const endDateTimestamp = Timestamp.fromDate(new Date(announce.endDate))
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
           currentTickets: announce.maxTickets,
           createdAt: Date.now(),
           endAt: endDateTimestamp,
           authorUid: announce.authorUid,
           status: AnnounceStatus.Valid,
         };
        const announceRef = collection(this.firestore, 'Announces');
        return addDoc(announceRef, newAnnounce);
      } catch (err) {
        console.error('Problem with the announce data');
        return null
      }
    }
  }

  deleteAnnounceById(id: string): Promise<void> {
    console.log('1')
    const announceDocRef = doc(this.firestore, `Announces/${id}`);
    return deleteDoc(announceDocRef);
  }


  async buyTickets(announceId: string, userId: string, ticketsBuyed: number): Promise<void> {
    try {
        if (!userId) {
            throw new Error('Invalid buyer');
        }
        const ticketIds: string[] = [];
        for (let i = 0; i < ticketsBuyed; i++) {
            ticketIds.push(this.genererId());
        }
        const announceRef = doc(this.firestore, 'Announces', announceId);
        const purchaseCollectionRef = collection(announceRef, 'PurchaseTickets');
        await runTransaction(this.firestore, async (transaction) => {
            const purchaseRef = doc(purchaseCollectionRef);
            const announceDoc = await transaction.get(announceRef);
            const currentTickets = announceDoc.data()?.['currentTickets']
            const updatedCurrentTickets = currentTickets - ticketsBuyed;
            transaction.update(announceRef, {
              currentTickets: updatedCurrentTickets,
            });
            await setDoc(purchaseRef, {
              date: serverTimestamp(),
              tickets: ticketIds,
              buyerId: userId,
            });
        });
    } catch (error) {
        console.error('Error buy ticket: : ', error);
        throw error;
    }
}

  genererId(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        id += caracteres.charAt(randomIndex);
    }
    return id;
  }
  

  emitAnnounceData(data: IAnnounce | null) {
    this.announceDataSubject.next(data);
  }

  async filterAnnounces(search: any): Promise<IAnnounce[]> {
    let resultSearch: IAnnounce[] = [];
    // TODO: filter title announce by word
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

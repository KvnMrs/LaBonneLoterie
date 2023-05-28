import { Injectable } from '@angular/core';
import {
  doc,
  DocumentData,
  DocumentSnapshot,
  Firestore,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { IUser } from 'src/app/models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore) {}

  createProfileUser(uid: string, user: IUser) {
    return setDoc(doc(this.firestore, 'Users', uid), user);
  }

  async getUserByID(id: string) {
    const userRef = doc(this.firestore, `Users`, id);
    const DOC_SNAP: DocumentSnapshot<DocumentData> = await getDoc(userRef);
    return DOC_SNAP.data();
  }

  upadteUserProfile(imgUrl: string, userData: IUser) {
    const userRef = doc(this.firestore, `Users`, userData.uid);
    setDoc(userRef, { ...userData, imgProfile: imgUrl });
  }
}

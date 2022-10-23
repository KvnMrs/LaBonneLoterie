import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  Firestore,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { IUserProfile } from 'src/app/models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore) {}

  createProfileUser(uid: string, user: IUserProfile) {
    return setDoc(doc(this.firestore, 'UserProfiles', uid), user);
  }

  // getUserById
  public async getUserByID(id: string) {
    const userRef = doc(this.firestore, `UserProfiles`, id);
    const DOC_SNAP: DocumentSnapshot<DocumentData> = await getDoc(userRef);
    return DOC_SNAP.data();
  }

  upadteUserProfile(imgUrl: string, userData: IUserProfile) {
    const userRef = doc(this.firestore, `UserProfiles`, userData.uid);
    setDoc(userRef, { ...userData, imgProfile: imgUrl });
  }
}

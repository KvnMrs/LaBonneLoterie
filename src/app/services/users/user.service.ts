import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { IUserProfile } from 'src/app/models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore) {}

  createProfileUser(uid: string, user: IUserProfile) {
    user.uid = uid;
    const userProfileRef = collection(this.firestore, 'UserProfiles');
    return addDoc(userProfileRef, user);
  }
}

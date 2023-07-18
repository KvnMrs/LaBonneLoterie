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

  async upadteUserProfile(userData: IUser) {
    const userRef = doc(this.firestore, `Users`, userData.uid);
    return setDoc(userRef, { ...userData });
  }

  async creditUserAccount(uid: string, sum: number) {
    const userRef = doc(this.firestore, `Users`, uid);
    await getDoc(userRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          userData['bankAccount'] = sum;
          setDoc(userRef, userData);
        } else {
          console.error("L'utilisateur n'existe pas.");
        }
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des données de l'utilisateur:",
          error
        );
      });
  }
}

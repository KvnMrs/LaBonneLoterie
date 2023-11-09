import { Injectable } from '@angular/core';
import {
  arrayUnion,
  collection,
  doc,
  docData,
  DocumentData,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore) {}

  createProfileUser(uid: string, userData: IUser) {
    return setDoc(doc(this.firestore, 'Users', uid), userData);
  }

  async getUserByID(id: string): Promise<IUser | null> {
    const userRef = doc(this.firestore, `Users`, id);
    const docSnap = await getDoc(userRef);
    const data = docSnap.data();
    return data as IUser;
  }

  async upadteUserProfile(userData: IUser) {
    const userRef = doc(this.firestore, `Users`, userData.uid);
    return setDoc(userRef, { ...userData }, { merge: true });
  }

  async onCreditUserAccount(uid: string, sum: number) {
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

  // Create Favorites Subcollection: Users/userId//favorites/announceId
  async addToFavorites(announceId: string, userId: string): Promise<void> {
    const usersCollectionRef = collection(this.firestore, 'Users');
    const usersDocRef = doc(usersCollectionRef, userId);
    const favoritesCollectionRef = collection(usersDocRef, 'Favorites');
    const favoritesDocRef = doc(favoritesCollectionRef, 'announces');
    const favoritesDoc = await getDoc(favoritesDocRef);
    if (favoritesDoc.exists()) {
      await updateDoc(favoritesDocRef, {
        announces_id: arrayUnion(announceId),
      });
    } else {
      await setDoc(favoritesDocRef, {
        announces_id: [announceId],
      });
    }
  }

  getFavorites(userId: string): Observable<DocumentData> {
    const usersCollectionRef = collection(this.firestore, 'Users');
    const usersDocRef = doc(usersCollectionRef, userId);
    const favoritesCollectionRef = collection(usersDocRef, 'Favorites');
    const favoritesDocRef = doc(favoritesCollectionRef, 'announces');
    return docData(favoritesDocRef);
  }

  async removeFavorite(announceId: string, userId: string) {
    const usersCollectionRef = collection(this.firestore, 'Users');
    const usersDocRef = doc(usersCollectionRef, userId);
    const favoritesCollectionRef = collection(usersDocRef, 'Favorites');
    const favoritesDocRef = doc(favoritesCollectionRef, 'announces');
    const favoritesDoc = await getDoc(favoritesDocRef);
    if (favoritesDoc.exists()) {
      const favoritesArray = favoritesDoc.data()['announces_id'] || [];
      const indexToRemove = favoritesArray.indexOf(announceId);
      favoritesArray.splice(indexToRemove, 1);
      return updateDoc(favoritesDocRef, { announces_id: favoritesArray });
    }
  }
}

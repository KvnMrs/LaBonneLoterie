import { Injectable } from '@angular/core';
import {
  arrayUnion,
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { from, map, Observable, switchMap } from 'rxjs';
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
    const DOC_SNAP: DocumentSnapshot<DocumentData> = await getDoc(userRef);
    return DOC_SNAP.data() as IUser;
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

  async addToFavorites(announceId: string, userId: string): Promise<void> {
    const favoritesCollectionRef = collection(this.firestore, 'Favorites');
    const favoritesDocRef = doc(favoritesCollectionRef, userId);
    const favoritesDoc = await getDoc(favoritesDocRef);
    if (favoritesDoc.exists()) {
      await updateDoc(favoritesDocRef, {
        annonces: arrayUnion(announceId),
      });
    } else {
      await setDoc(favoritesDocRef, {
        announces: [announceId],
      });
    }
  }

  getFavorites(userId: string): Observable<string[]> {
    const favoritesCollectionRef = collection(this.firestore, 'Favorites');
    const favorisDocRef = doc(favoritesCollectionRef, userId);
    return from(getDoc(favorisDocRef)).pipe(
      map((doc) => doc.data()!['annonces'] as string[])
    );
  }

  async removeFavorite(announceId: string, userId: string) {
    const favoritesCollectionRef = collection(this.firestore, 'Favorites');
    const favoritesDocRef = doc(favoritesCollectionRef, userId);
    const favoritesDoc = await getDoc(favoritesDocRef);
    if (favoritesDoc.exists()) {
      const favoritesArray = favoritesDoc.data()['annonces'] || [];
      const indexToRemove = favoritesArray.indexOf(announceId);
      favoritesArray.splice(indexToRemove, 1);
      return updateDoc(favoritesDocRef, { annonces: favoritesArray });
    }
  }
}

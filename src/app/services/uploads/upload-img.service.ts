import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class UploadImgService {
  constructor(public storage: Storage) {}

  upload(file: any) {
    const imgRef = ref(this.storage, `announesImg/${file.name}`);
    const uploadTask = uploadBytesResumable(imgRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        console.log(`Upload is ${progress}% done`);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref);
      }
    );
  }
}

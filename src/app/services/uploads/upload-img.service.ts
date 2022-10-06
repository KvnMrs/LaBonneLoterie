import { Injectable } from '@angular/core';
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

  async upload(file: File) {
    const imgRef = ref(this.storage, `announesImg/${file.name}`);
    const uploadTask = uploadBytesResumable(imgRef, file);
    return getDownloadURL(uploadTask.snapshot.ref);
  }
}

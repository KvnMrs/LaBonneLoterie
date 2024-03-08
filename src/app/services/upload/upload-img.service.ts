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
  constructor(private storage: Storage) {}

  async uploadAnnounceImg(file: File): Promise<string> {
    const imgRef = ref(this.storage, `announcesImg/${file.name}`);
    await uploadBytesResumable(imgRef, file);
    const imgUrl = await getDownloadURL(
      ref(this.storage, `announcesImg/${file.name}`)
    );
    return imgUrl;
  }

  async uploadProfileImg(file: File): Promise<string> {
    const imgRef = ref(this.storage, `profileImg/${file.name}`);
    await uploadBytesResumable(imgRef, file);
    const imgUrl = await getDownloadURL(
      ref(this.storage, `profileImg/${file.name}`)
    );
    return imgUrl;
  }

  showImgBeforeUpload(event: File): void {
    const reader = new FileReader();

    reader.onload = function (event) {
      const imageUrl = event.target!.result as string;

      const previewImage = document.getElementById(
        'previewImage'
      ) as HTMLImageElement;
      if (previewImage !== null) {
        previewImage.src = imageUrl;
      }
    };
    reader.readAsDataURL(event);
  }
}

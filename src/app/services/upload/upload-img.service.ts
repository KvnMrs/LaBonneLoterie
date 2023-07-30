import { Injectable } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root',
})
export class UploadImgService {
  constructor(public storage: Storage, private userService: UserService) {}

  async uploadAnnounceImg(file: File) {
    const imgRef = ref(this.storage, `announcesImg/${file.name}`);
    await uploadBytesResumable(imgRef, file);
    const imgUrl = await getDownloadURL(
      ref(this.storage, `announcesImg/${file.name}`)
    );
    return imgUrl;
  }

  async uploadProfileImg(file: File) {
    const imgRef = ref(this.storage, `profileImg/${file.name}`);
    await uploadBytesResumable(imgRef, file);
    const imgUrl = await getDownloadURL(
      ref(this.storage, `profileImg/${file.name}`)
    );
    return imgUrl;
  }

  showImgBeforeUpload(event: File) {
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

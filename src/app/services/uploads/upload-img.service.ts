import { Injectable } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';
import { IUserProfile } from 'src/app/models/user/user.model';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root',
})
export class UploadImgService {
  constructor(public storage: Storage, private userService: UserService) {}

  async uploadAnnounceImg(file: File) {
    const imgRef = ref(this.storage, `announesImg/${file.name}`);
    await uploadBytesResumable(imgRef, file);
    const imgUrl = getDownloadURL(
      ref(this.storage, `announesImg/${file.name}`)
    );
    return imgUrl;
  }

  async uploadProfileImg(file: File, userData: IUserProfile) {
    const imgRef = ref(this.storage, `profileImg/${file.name}`);
    await uploadBytesResumable(imgRef, file);
    const imgUrl = await getDownloadURL(
      ref(this.storage, `profileImg/${file.name}`)
    );
    return this.userService.upadteUserProfile(imgUrl, userData);
  }
}
